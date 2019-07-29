import React from "react";
import { Field, reduxForm, isDirty } from "redux-form";
import { connect } from "react-redux";
import FormInput from "../shared/form/FormInput";
import FormTextArea from "../shared/form/FormTextArea";
import FormSelect from "../shared/form/FormSelect";
import FormFileUpload from "../shared/form/FormFileUpload";
import ResError from "../shared/form/ResError";
import { toUpperCase } from "../../helpers";

const RentalForm = props => {
  const {
    handleSubmit,
    submitCb,
    options,
    errors,
    valid,
    submitting,
    pristine
  } = props;

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
        normalize={toUpperCase}
        component={FormInput}
      />
      <Field
        name="street"
        type="text"
        label="Street"
        className="form-control"
        normalize={toUpperCase}
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

      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Submit Rental
      </button>
      <ResError errors={errors} />
    </form>
  );
};

const getDirtyFields = (state, initFields) => {
  const fields = {};
  if (initFields) {
    Object.keys(initFields).forEach(
      key => (fields[key] = isDirty("rentalForm")(state, key))
    );
  }
  return fields;
};

const validate = values => {
  const errors = {};

  if (values.bedrooms && values.bedrooms <= 0) {
    errors.bedrooms = "Please enter a valid number of bedrooms";
  }

  if (values.dailyRate && values.dailyRate <= 0) {
    errors.dailyRate = "Please enter a valid amount";
  }

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return {
    dirtyFields: getDirtyFields(state, ownProps.initialValues)
  };
};
const formWrapped = reduxForm({
  form: "rentalForm",
  validate
})(RentalForm);

export default connect(mapStateToProps)(formWrapped);
