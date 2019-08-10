const User = require("../models/user");
const Rental = require("../models/rental");
const Booking = require("../models/booking");
const Review = require("../models/review");
const moment = require("moment");
const { normalizeErrors } = require("../helpers/mongoose");

exports.getReviews = (req, res) => {
  const { rentalId } = req.query;

  Review.find({ rental: rentalId })
    .populate("user")
    .exec((err, reviews) => {
      if (err) {
        {
          return res.status(401).send({ errors: normalizeErrors(err.errors) });
        }
      }

      return res.json(reviews);
    });
};

exports.createReview = (req, res) => {
  const reviewData = req.body;
  const { bookingId } = req.query;
  const user = res.locals.user;

  Booking.findById(bookingId)
    .populate({
      path: "rental",
      populate: { path: "user" }
    })
    .populate("review")
    .populate("user")
    .exec(async (err, foundBooking) => {
      if (err) {
        {
          return res.status(401).send({ errors: normalizeErrors(err.errors) });
        }
      }
      const { rental } = foundBooking;
      if (rental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid user",
              detail: "Cannot create review on your rental"
            }
          ]
        });
      }

      const bookingUserId = foundBooking.user.id;
      if (bookingUserId != user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid user",
              detail: "Cannot write review on someone else booking"
            }
          ]
        });
      }

      const timeNow = moment();
      const endAt = moment(foundBooking.endAt);

      if (!endAt.isBefore(timeNow)) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid date",
              detail: "You can write review only after you stay in this rental"
            }
          ]
        });
      }

      if (foundBooking.review) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid booking",
              detail: "You've already reviewed your stay in this rental"
            }
          ]
        });
      }
      const review = new Review(reviewData);
      review.user = user;
      review.rental = rental;
      foundBooking.review = review;

      try {
        await foundBooking.save();
        const savedReview = await review.save();
        return res.json(savedReview);
      } catch (err) {
        return res.status(401).send({ errors: normalizeErrors(err.errors) });
      }
    });
};
