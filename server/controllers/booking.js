const moment = require("moment");
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");

exports.getUserBookings = function(req, res) {
  const user = res.locals.user;
  Booking.where({ user })
    .populate("rental")
    .exec((err, foundBookings) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};
exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rentalId } = req.body;
  const user = res.locals.user;
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    days,
    guests
  });
  Rental.findById(rentalId)
    .populate("bookings")
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(401).send({ errors: normalizeErrors(err.errors) });
      }
      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid user",
              detail: "Cannot create booking on your rental"
            }
          ]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);
        booking.save(err => {
          if (err) {
            {
              return res
                .status(401)
                .send({ errors: normalizeErrors(err.errors) });
            }
          }
          foundRental.save();
          User.updateOne(
            { _id: user.id },
            { $push: { bookings: booking } },
            () => {}
          );
          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid booking",
              detail: "Chosen dates are already taken"
            }
          ]
        });
      }
    });
};

function isValidBooking(proposedBooking, rental) {
  if (rental.bookings && rental.bookings.length > 0) {
    return rental.bookings.every(booking => {
      return (
        moment(proposedBooking.startAt) > moment(booking.endAt) ||
        moment(proposedBooking.endAt) < moment(booking.startAt)
      );
    });
  }
  return true;
}
