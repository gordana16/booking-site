import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { createBooking } from "../../actions";
import ResError from "../shared/form/ResError";
import Payment from "../payment/Payment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentToken: "",
      errors: []
    };

    this.setPaymentToken = this.setPaymentToken.bind(this);
  }

  handleReservation() {
    const { open, onBooked, ...booking } = this.props;
    const { paymentToken } = this.state;
    createBooking({ ...booking, paymentToken: paymentToken })
      .then(onBooked)
      .catch(errors => {
        this.setState({ errors });
      });
  }

  resetErrors() {
    this.setState({ errors: [] });
  }

  setPaymentToken(paymentToken) {
    this.setState({ paymentToken });
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
    const { paymentToken } = this.state;
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
          <Payment setPaymentToken={this.setPaymentToken} />
          <p>Do you confirm your booking for selected days?</p>
        </div>
        <ResError errors={this.state.errors} />
        <div className="modal-footer">
          <button
            disabled={
              !paymentToken ||
              (this.state.errors && this.state.errors.length > 0)
            }
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
