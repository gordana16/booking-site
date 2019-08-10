import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUserBookings,
  getPendingPayments,
  acceptPayment,
  declinePayment
} from "../../actions";
import BookingCard from "./BookingCard";

class BookingManage extends Component {
  state = {
    pendingPayments: []
  };
  componentDidMount() {
    this.props.fetchUserBookings();
    this.getPendingPayments();
  }

  renderBookings(bookings) {
    return bookings.map(booking => (
      <BookingCard key={booking._id} booking={booking} />
    ));
  }

  getPendingPayments() {
    getPendingPayments()
      .then(pendingPayments => {
        this.setState({ pendingPayments });
      })
      .catch(err => console.error(err));
  }
  updatePendingPayments(payment, status) {
    const { pendingPayments } = this.state;
    const updatedPayments = pendingPayments.map(p => {
      if (p._id !== payment._id) {
        return p;
      }
      return {
        ...p,
        ...status
      };
    });
    this.setState({ pendingPayments: updatedPayments });
  }

  acceptPayment(payment) {
    acceptPayment(payment).then(
      status => this.updatePendingPayments(payment, status),
      err => console.error(err)
    );
  }

  declinePayment(payment) {
    declinePayment(payment).then(
      status => this.updatePendingPayments(payment, status),
      err => console.error(err)
    );
  }

  renderPaymentButtons = payment => (
    <div>
      <button
        onClick={() => this.acceptPayment(payment)}
        className="btn btn-success"
      >
        Accept
      </button>{" "}
      <button
        onClick={() => this.declinePayment(payment)}
        className="btn btn-danger"
      >
        Decline
      </button>
    </div>
  );

  renderPayments(payments) {
    return payments.map(payment => (
      <BookingCard
        key={payment._id}
        payment={payment}
        booking={payment.booking}
        paymentBtns={this.renderPaymentButtons}
      />
    ));
  }

  render() {
    const { data: bookings, errors, isFetching } = this.props.bookings;
    const { pendingPayments } = this.state;

    return (
      <React.Fragment>
        <section id="userBookings">
          <h1 className="page-title">My Bookings</h1>
          <div className="row">{this.renderBookings(bookings)}</div>
          {!isFetching && errors.length === 0 && bookings.length === 0 && (
            <div className="alert alert-warning">
              You have no bookings created go to rentals section and book your
              place today.
              <Link
                style={{ marginLeft: "10px" }}
                className="btn btn-bwm"
                to="/rentals/"
              >
                Available Rental
              </Link>
            </div>
          )}
        </section>
        <section id="userPendingBookings">
          <h1 className="page-title">My Pending Bookings</h1>
          <div className="row">{this.renderPayments(pendingPayments)}</div>
          {!isFetching &&
            errors.length === 0 &&
            pendingPayments.length === 0 && (
              <div className="alert alert-warning">
                You have no pending bookings currently...
              </div>
            )}
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { bookings: state.bookings };
};
export default connect(
  mapStateToProps,
  { fetchUserBookings }
)(BookingManage);
