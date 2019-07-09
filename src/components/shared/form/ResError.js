import React from "react";

const ResErrors = ({ errors }) => {
  return (
    errors &&
    errors.length > 0 && (
      <div className="alert alert-danger bwm-res-errors">
        {errors.map((err, index) => (
          <p key={index}>{err.detail}</p>
        ))}
      </div>
    )
  );
};
export default ResErrors;
