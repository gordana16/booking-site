import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { pretifyDate, toUpperCase } from "../../helpers";
import ReviewModal from "../review/ReviewModal";
import { updateBookings } from "../../actions";
import { isExpired } from "../../helpers";

const BookingCard = props => {
  const { booking, bookings, payment, paymentBtns, updateBookings } = props;

  const handleReviewCreated = review => {
    const updatedBookings = bookings.map(current => {
      if (current._id !== booking._id) {
        return current;
      } else {
        return { ...current, review: review._id };
      }
    });
    updateBookings(updatedBookings);
  };
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {!payment && (
            <div className="d-flex justify-content-center align-items-center">
              {booking.status === "declined" && (
                <span className="badge badge-danger align-self-start">
                  Declined
                </span>
              )}
              <span>
                {booking.rental ? booking.rental.category : "Deleted Rental"}
              </span>
            </div>
          )}
          {payment && `Booking Made by User ${payment.fromUser.username}`}
        </div>
        <div className="card-block">
          {booking.rental && (
            <div>
              <h4 className="card-title">
                {booking.rental.title} -{toUpperCase(booking.rental.city)}
              </h4>
              <p className="card-text booking-desc">
                {!payment && booking.rental.description}
              </p>
            </div>
          )}

          <p className="card-text booking-days">
            {pretifyDate(booking.startAt)} -{pretifyDate(booking.endAt)} |{" "}
            {booking.days} days
          </p>
          <p className="card-text booking-price">
            <span>Price: </span>
            <span className="booking-price-value">
              {payment ? payment.amount / 100 : booking.totalPrice} $
            </span>
          </p>
          {payment && (
            <p className="card-text payment-status">Status: {payment.status}</p>
          )}
          {booking.rental && (
            <Link className="btn btn-bwm" to={`/rentals/${booking.rental._id}`}>
              Go to Rental
            </Link>
          )}
          {!payment && !booking.review && isExpired(booking.endAt) && (
            <ReviewModal
              bookingId={booking._id}
              onReviewCreated={review => handleReviewCreated(review)}
            />
          )}
        </div>
        <div className="card-footer text-muted">
          Created {pretifyDate(booking.createdAt)}
          {payment &&
            payment.status === "pending" &&
            paymentBtns &&
            paymentBtns(payment)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { bookings: state.bookings.data };
};

export default connect(
  mapStateToProps,
  { updateBookings }
)(BookingCard);
