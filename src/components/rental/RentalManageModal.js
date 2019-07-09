import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { pretifyDate } from "../../helpers";

class RentalManageModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => {
      return (
        <React.Fragment key={booking._id}>
          <p>
            <span>Date:</span> {pretifyDate(booking.startAt)} -
            {pretifyDate(booking.endAt)}
          </p>
          <p>
            <span>Guests:</span> {booking.guests}
          </p>
          <p>
            <span>Total Price:</span> {booking.totalPrice} $
          </p>
          {index + 1 < bookings.length && <hr />}
        </React.Fragment>
      );
    });
  }
  render() {
    const open = this.state.open;
    const bookings = this.props.bookings;
    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => this.setState({ open: true })}
          className="btn btn-bwm"
        >
          Bookings
        </button>
        <Modal
          open={open}
          onClose={() => this.setState({ open: false })}
          classNames={{ modal: "rental-booking-modal" }}
        >
          <h4 className="modal-title title">Made Bookings</h4>
          <div className="modal-body bookings-inner-container">
            {this.renderBookings(bookings)}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => this.setState({ open: false })}
              className="btn btn-bwm"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RentalManageModal;
