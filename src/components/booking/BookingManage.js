import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserBookings } from "../../actions";
import BookingCard from "./BookingCard";

class BookingManage extends Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }

  renderBookingCards(bookings) {
    return bookings.map(booking => (
      <BookingCard key={booking._id} booking={booking} />
    ));
  }

  render() {
    const { data: bookings, isFetching } = this.props.bookings;
    return (
      <section id="userBookings">
        <h1 className="page-title">My Bookings</h1>
        <div className="row">{this.renderBookingCards(bookings)}</div>
        {!isFetching && bookings.length === 0 && (
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
