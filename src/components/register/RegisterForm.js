import React from "react";
import { Field, reduxForm } from "redux-form";
import FormInput from "../shared/form/FormInput";
import ResError from "../shared/form/ResError";

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={FormInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component={FormInput}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Register
      </button>
      <ResError errors={errors} />
    </form>
  );
};
const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = "username length is min 4 characters";
  }

  if (!values.email) {
    errors.email = "Please enter an email!";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter password confirmation!";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords should match!";
  }

  return errors;
};

export default reduxForm({
  form: "register",
  validate
})(RegisterForm);
