import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RentalCreateForm from "./RentalCreateForm";
import { createRental } from "../../actions";

class RentalCreate extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      redirect: false
    };
    this.categoryOptions = ["apartment", "house", "condo"];
    this.createRental = this.createRental.bind(this);
  }
  createRental(rentalData) {
    createRental(rentalData).then(
      rental => this.setState({ redirect: true }),
      errors => this.setState({ errors })
    );
  }
  render() {
    const { errors, redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: "/rentals/" }} />;
    }
    return (
      <div id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Create Rental</h1>
              <RentalCreateForm
                submitCb={this.createRental}
                options={this.categoryOptions}
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

export default RentalCreate;
