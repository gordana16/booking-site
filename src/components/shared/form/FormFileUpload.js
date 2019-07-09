import React from "react";

const FormFileUpload = ({
  input,
  label,
  type,
  accept,
  meta: { touched, error }
}) => {
  const onChange = () => {
    const { onChange } = input;
    onChange(
      "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg"
    );
  };
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <input type={type} accept={accept} onChange={onChange} />
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
    </div>
  );
};

export default FormFileUpload;
