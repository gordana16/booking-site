import React from "react";

const FormSelect = ({
  input,
  label,
  options,
  className,
  meta: { touched, error }
}) => {
  function renderOptions(options) {
    return options.map((option, index) => (
      <option key={index}>{option}</option>
    ));
  }
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <select {...input} className={className}>
          {renderOptions(options)}
        </select>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
    </div>
  );
};

export default FormSelect;
