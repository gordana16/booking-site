import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import { uploadImage } from "../../../actions";

class FormFileUpload extends Component {
  constructor(props) {
    super(props);
    this.setupReader();
    this.state = {
      selectedFile: undefined,
      initialImageBase64: "",
      imageBase64: "",
      croppedImg: {},
      pending: false,
      status: "INIT",
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
        x: 0,
        y: 0
      }
    };
    this.onChange = this.onChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  setupReader() {
    this.reader = new FileReader();
    this.reader.addEventListener("load", event => {
      const { initialImageBase64 } = this.state;
      const imageBase64 = event.target.result;

      if (initialImageBase64) {
        this.setState({ imageBase64 });
      } else {
        this.setState({ imageBase64, initialImageBase64: imageBase64 });
      }
    });
  }
  onChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.setState({ selectedFile });
    }
    this.reader.readAsDataURL(selectedFile);
  }
  onCropChange(crop) {
    this.setState({ crop });
  }

  onImageLoaded = image => {
    this.imageRef = image;
  };

  async onCropCompleted(crop) {
    const { selectedFile } = this.state;
    if (selectedFile && crop.height > 0 && crop.width > 0) {
      const croppedImg = await this.getCroppedImg(
        this.imageRef,
        crop,
        selectedFile.name
      );
      this.setState({ croppedImg });
      this.reader.readAsDataURL(croppedImg);
    }
  }
  onSuccess(uploadedImage) {
    const {
      input: { onChange }
    } = this.props;
    this.setState({
      pending: false,
      status: "OK",
      initialImageBase64: "",
      imageBase64: "",
      selectedFile: ""
    });
    onChange(uploadedImage);
  }

  onError(error) {
    this.setState({ pending: false, status: "FAIL" });
  }
  uploadImage() {
    const { croppedImg } = this.state;

    if (croppedImg) {
      this.setState({ pending: true, status: "INIT" });
      uploadImage(croppedImg).then(
        uploadedImage => this.onSuccess(uploadedImage),
        error => this.onError(error)
      );
    }
  }

  renderSpinningCircle() {
    const { pending } = this.state;
    if (pending) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }

  renderImageStatus() {
    const { status } = this.state;
    if (status === "OK") {
      return (
        <div className="alert alert-success">Image uploaded successfully</div>
      );
    }
    if (status === "FAIL") {
      return <div className="alert alert-danger">Image upload failed</div>;
    }
  }
  render() {
    const {
      type,
      accept,
      meta: { touched, error }
    } = this.props;
    const {
      selectedFile,
      imageBase64,
      initialImageBase64,
      pending,
      crop
    } = this.state;

    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-bwm">
          <span className="upload-text">Select an image</span>
          <input type={type} accept={accept} onChange={this.onChange} />
        </label>
        {selectedFile && (
          <button
            className="btn btn-success btn-upload"
            type="button"
            disabled={!selectedFile}
            onClick={() => this.uploadImage()}
          >
            Upload Image
          </button>
        )}

        {initialImageBase64 && (
          <ReactCrop
            crop={crop}
            src={initialImageBase64}
            minWidth={10}
            onChange={crop => this.onCropChange(crop)}
            onImageLoaded={image => this.onImageLoaded(image)}
            onComplete={crop => this.onCropCompleted(crop)}
          />
        )}

        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}
        {imageBase64 && (
          <div
            className={
              pending ? "img-preview-container-active" : "img-preview-container"
            }
          >
            <div
              className="img-preview"
              style={{ backgroundImage: `url(${imageBase64})` }}
            />
            {this.renderSpinningCircle()}
          </div>
        )}
        {this.renderImageStatus()}
      </div>
    );
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  }
}

export default FormFileUpload;
