import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import {
  createOptions,
  formStyles,
  buttonStyles,
  paragraphStyles
} from "./styles";

class CheckoutForm extends Component {
  state = {
    error: undefined
  };
  handleSubmit = async e => {
    const { stripe, setPaymentToken } = this.props;
    e.preventDefault();
    if (stripe) {
      stripe.createToken().then(payload => {
        if (payload.error) {
          return this.setState({ error: payload.error.message });
        }
        setPaymentToken(payload.token.id);
      });
    } else {
      console.error("Stripe.js hasn't loaded yet");
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form {...formStyles()} onSubmit={this.handleSubmit}>
        <CardElement {...createOptions()} />
        <p {...paragraphStyles()}>You will not be charged yet</p>
        {error && (
          <div className="alert alert-danger alert-payment">{error}</div>
        )}
        <button {...buttonStyles()} className="btn btn-success">
          Confirm payment
        </button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
