const express = require("express");
const Cart = require("../controller/cartController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

//cart Routes
router
  .route("/cart")
  .get(protect, Cart.getCart)
  .post(protect, Cart.addToCart)
  .put(protect, Cart.removeCart);
// .post(protect, User.addToCart)
//.delete(protect, User.delFromCart);

module.exports = router;
