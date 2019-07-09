const express = require("express");
const BookingCtrl = require("../controllers/booking");
const UserCtrl = require("../controllers/user");

const router = express.Router();

router.post("", UserCtrl.authMiddleware, BookingCtrl.createBooking);
router.get("/manage", UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;
