import React from "react";

const FormTextArea = ({
  input,
  label,
  rows,
  type,
  className,
  meta: { touched, error }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-group">
      <textarea {...input} type={type} rows={rows} className={className} />
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);

export default FormTextArea;
