const express = require("express");
const router = express.Router();

const paymentController = require("../controller/paymentController");

router.post("/order", paymentController.OrderPost);
router.post("/verify", paymentController.OrderVerify);

module.exports = router;
