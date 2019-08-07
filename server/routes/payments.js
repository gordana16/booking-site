const express = require("express");
const PaymentCtrl = require("../controllers/payment");
const UserCtrl = require("../controllers/user");

const router = express.Router();

router.get("", UserCtrl.authMiddleware, PaymentCtrl.getPendingPayments);
router.post("/accept", UserCtrl.authMiddleware, PaymentCtrl.confirmPayment);
router.post("/decline", UserCtrl.authMiddleware, PaymentCtrl.declinePayment);

module.exports = router;
