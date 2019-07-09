import React, { Component } from "react";
import { Link } from "react-router-dom";
import { pretifyDate, toUpperCase } from "../../helpers";
import RentalManageModal from "./RentalManageModal";

class RentalManageCard extends Component {
  constructor(props) {
    super(props);
    this.state = { wantDelete: false };
  }
  showDeleteMenu() {
    this.setState({ wantDelete: true });
  }
  hideDeleteMenu() {
    this.setState({ wantDelete: false });
  }
  deleteRental(rentalId) {
    this.hideDeleteMenu();
    this.props.deleteRentalCb(rentalId);
  }
  render() {
    const { rental } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? "toBeDeleted" : "";
    return (
      <div className="col-md-4">
        <div className={`card text-center ${deleteClass}`}>
          <div className="card-block">
            <h4 className="card-title">
              {rental.title} - {toUpperCase(rental.city)}
            </h4>
            <Link className="btn btn-bwm" to={`/rentals/${rental._id}`}>
              Go to Rental
            </Link>
            {rental.bookings && rental.bookings.length > 0 && (
              <RentalManageModal bookings={rental.bookings} />
            )}
          </div>
          <div className="card-footer text-muted">
            <div className="d-flex">
              <span className="mx-auto">
                Created at {pretifyDate(rental.createdAt)}
              </span>
              {!wantDelete && (
                <button
                  onClick={() => this.showDeleteMenu()}
                  className="btn btn-danger "
                >
                  Delete
                </button>
              )}
            </div>

            {wantDelete && (
              <React.Fragment>
                <p className="my-2">
                  Do you really want to delete this property?
                </p>
                <button
                  onClick={() => this.deleteRental(rental._id)}
                  className="btn btn-danger mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => this.hideDeleteMenu()}
                  className="btn btn-success"
                >
                  No
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RentalManageCard;
