const config = require("../config");
const stripe = require("stripe")(config.STRIPE_SK);
const Payment = require("../models/payment");
const Rental = require("../models/rental");
const Booking = require("../models/booking");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

exports.getPendingPayments = function(req, res) {
  const user = res.locals.user;

  Payment.where({ toUser: user })
    .populate({
      path: "booking",
      populate: { path: "rental" }
    })
    .populate("fromUser")
    .exec((err, foundPayments) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundPayments);
    });
};

exports.confirmPayment = function(req, res) {
  const payment = req.body;
  const user = res.locals.user;

  Payment.findById(payment._id)
    .populate("toUser")
    .populate("booking")
    .exec(async (err, foundPayment) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (
        foundPayment.status === "pending" &&
        user.id === foundPayment.toUser.id
      ) {
        const booking = foundPayment.booking;
        const charge = await stripe.charges.create({
          amount: booking.totalPrice * 100,
          currency: "usd",
          customer: payment.fromStripeCustomerId
        });

        if (charge) {
          Booking.updateOne(
            { _id: booking.id },
            { $set: { status: "active" } },
            () => {}
          );
          Payment.updateOne(
            { _id: foundPayment.id },
            {
              $set: {
                charge: charge,
                status: "paid"
              }
            },
            () => {}
          );

          User.updateOne(
            { _id: foundPayment.toUser.id },
            { $inc: { balance: foundPayment.amount } },
            err => {
              if (err) {
                return res
                  .status(422)
                  .send({ errors: normalizeErrors(err.errors) });
              }
              return res.json({ status: "paid" });
            }
          );
        }
      }
    });
};

exports.declinePayment = (req, res) => {
  const payment = req.body;

  Payment.findById(payment._id)
    .populate("booking")
    .exec(async (err, foundPayment) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      Payment.updateOne(
        { _id: foundPayment.id },
        { $set: { status: "declined" } },
        () => {}
      );

      Booking.updateOne(
        { _id: foundPayment.booking },
        { $set: { status: "declined" } },
        () => {}
      );

      Rental.updateOne(
        { _id: foundPayment.booking.rental },
        { $pull: { bookings: foundPayment.booking._id } },
        () => {}
      );
      return res.json({ status: "declined" });
    });
};
