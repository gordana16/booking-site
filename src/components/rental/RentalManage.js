import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { fetchUserRentals, deleteRental } from "../../actions";
import RentalManageCard from "./RentalManageCard";

class RentalManage extends Component {
  constructor() {
    super();
    this.deleteUserRental = this.deleteUserRental.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserRentals();
  }

  deleteUserRental(id) {
    deleteRental(id).then(
      () => {
        toast.success("Rental is successfully deleted!");
        this.props.fetchUserRentals();
      },
      errors => toast.error(errors[0].detail)
    );
  }

  renderUserRentalList(rentals) {
    return rentals.map(rental => (
      <RentalManageCard
        key={rental._id}
        rental={rental}
        deleteRentalCb={this.deleteUserRental}
      />
    ));
  }

  render() {
    const { data: rentals, isFetching } = this.props.rentals;
    return (
      <section id="userRentals">
        <ToastContainer />
        <h1 className="page-title">My Rentals</h1>
        <div className="row">{this.renderUserRentalList(rentals)}</div>
        {!isFetching && rentals.length === 0 && (
          <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised
            your property please follow this link.
            <Link
              style={{ marginLeft: "10px" }}
              className="btn btn-bwm"
              to="/rentals/new"
            >
              Register Rental
            </Link>
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { rentals: state.rentals };
};
export default connect(
  mapStateToProps,
  { fetchUserRentals }
)(RentalManage);
