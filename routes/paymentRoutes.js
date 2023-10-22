const express = require("express");
const router = express.Router();

const paymentController = require("../controller/paymentController");
const protect = require("../middleware/authMiddleware");

router.post("/order", protect, paymentController.OrderPost);
router.post("/verify", protect, paymentController.OrderVerify);

module.exports = router;
