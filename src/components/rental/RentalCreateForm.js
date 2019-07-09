import React from "react";
import { Field, reduxForm } from "redux-form";
import FormInput from "../shared/form/FormInput";
import FormTextArea from "../shared/form/FormTextArea";
import FormSelect from "../shared/form/FormSelect";
import FormFileUpload from "../shared/form/FormFileUpload";
import ResError from "../shared/form/ResError";

const RentalCreateForm = props => {
  const { handleSubmit, submitCb, options, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        label="Title"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="description"
        type="text"
        rows="6"
        label="Description"
        className="form-control"
        component={FormTextArea}
      />
      <Field
        name="city"
        type="text"
        label="City"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="street"
        type="text"
        label="Street"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="category"
        label="Category"
        options={options}
        className="form-control"
        component={FormSelect}
      />
      <Field
        name="image"
        type="file"
        accept=".jpg, .jpeg, .png"
        label="Upload Image"
        component={FormFileUpload}
      />
      <Field
        name="bedrooms"
        type="number"
        label="Bedrooms"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="dailyRate"
        type="text"
        label="Daily Rate"
        symbol="$"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="shared"
        type="checkbox"
        label="Shared"
        component={FormInput}
      />

      <button className="btn btn-bwm btn-form" type="submit">
        Create Rental
      </button>
      <ResError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: "rentalCreateForm",
  initialValues: { shared: false, category: "apartment" }
})(RentalCreateForm);
