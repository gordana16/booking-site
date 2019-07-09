import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { createBooking } from "../../actions";
import ResError from "../shared/form/ResError";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  handleReservation() {
    const { open, onBooked, ...booking } = this.props;
    createBooking(booking)
      .then(onBooked)
      .catch(errors => {
        this.setState({ errors });
      });
  }

  resetErrors() {
    this.setState({ errors: [] });
  }

  render() {
    const {
      startAt,
      endAt,
      days,
      guests,
      dailyRate,
      open,
      closeModal
    } = this.props;
    return (
      <Modal
        open={open}
        onClose={closeModal}
        onExited={() => this.resetErrors()}
        classNames={{ modal: "booking-modal" }}
      >
        <h4 className="modal-title title">Confirm Booking </h4>
        <p className="dates">
          {startAt} / {endAt}
        </p>
        <div className="modal-body">
          <em>{days}</em> nights /<em>{dailyRate}$</em> per Night
          <p>
            Guests: <em>{guests}</em>
          </p>
          <p>
            Price: <em>{days * dailyRate}$ </em>
          </p>
          <p>Do you confirm your booking for selected days?</p>
        </div>
        <ResError errors={this.state.errors} />
        <div className="modal-footer">
          <button
            disabled={this.state.errors && this.state.errors.length > 0}
            type="button"
            className="btn btn-bwm"
            onClick={() => this.handleReservation()}
          >
            Confirm
          </button>
          <button type="button" onClick={closeModal} className="btn btn-bwm">
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

export default BookingModal;
