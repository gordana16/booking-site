import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import RentalForm from "./RentalForm";
import { updateRental } from "../../actions";

class RentalDetailUpdate extends Component {
  constructor() {
    super();

    this.categoryOptions = ["apartment", "house", "condo"];
    this.updateRental = this.updateRental.bind(this);
  }

  updateRental(rentalData, _, { dirtyFields }) {
    const dirtyKeys = Object.keys(rentalData).filter(
      key => dirtyFields[key] !== false
    );
    const fields = {};
    dirtyKeys.forEach(key => (fields[key] = rentalData[key]));

    this.props.updateRental(rentalData._id, fields);
  }
  componentDidUpdate(prevProps) {
    const { errors, isUpdating } = this.props;
    if (!isUpdating && prevProps.isUpdating !== isUpdating) {
      if (errors.length === 0) {
        toast.success("Rental has been successfuly updated!");
      }
    }
  }

  render() {
    const { rental, errors, isAuth } = this.props;

    if (!isAuth) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    return (
      <div id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Update Rental</h1>
              <RentalForm
                submitCb={this.updateRental}
                isAuth={isAuth}
                options={this.categoryOptions}
                initialValues={{ ...rental }}
                errors={errors}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={`${process.env.PUBLIC_URL}/img/create-rental.jpg`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.data,
    errors: state.rental.errors,
    isUpdating: state.rental.isUpdating,
    isAuth: state.auth.isAuth
  };
};
export default connect(
  mapStateToProps,
  { updateRental }
)(RentalDetailUpdate);
