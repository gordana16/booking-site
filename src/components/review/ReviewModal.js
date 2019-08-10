import React, { Component } from "react";
import Modal from "react-responsive-modal";
import StarRatings from "react-star-ratings";
import { createReview } from "../../actions";
import ResError from "../shared/form/ResError";

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: "",
      rating: 3,
      errors: []
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  closeModal() {
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
  }
  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }
  changeRating(newRating) {
    this.setState({
      rating: newRating
    });
  }
  publishReview() {
    const { text, rating } = this.state;
    const { bookingId, onReviewCreated } = this.props;

    createReview({ text, rating }, bookingId).then(
      review => {
        this.closeModal();
        onReviewCreated(review);
      },
      errors => this.setState({ errors })
    );
  }
  render() {
    const { open, text, rating, errors } = this.state;

    return (
      <React.Fragment>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => this.openModal()}
          className="btn btn-bwm"
        >
          Review
        </button>
        <Modal
          open={open}
          onClose={() => this.closeModal()}
          classNames={{ modal: "rental-modal" }}
        >
          <h4 className="modal-title title">Confirm Review </h4>
          <div className="modal-body">
            <textarea
              style={{ marginBottom: "10px" }}
              value={text}
              onChange={this.handleTextChange}
              className="form-control"
              placeholder="Write your experience with this place"
              rows={3}
              cols={50}
            />
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              starHoverColor="orange"
              starDimension="25px"
              starSpacing="2px"
              changeRating={this.changeRating}
              numberOfStars={5}
              name="rating"
            />
          </div>
          <ResError errors={errors} />
          <div className="modal-footer">
            <button
              type="button"
              disabled={!text || !rating}
              className="btn btn-bwm"
              onClick={() => this.publishReview()}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => this.closeModal()}
              className="btn btn-bwm"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ReviewModal;
