const express = require("express");
const Cart = require("../controller/cartController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const UserRestrict = require("../middleware/restrictMiddleware");
//cart Routes
router
  .route("/cart")
  .get(protect, UserRestrict.restrict(["user"]), Cart.getCart)
  .post(protect, UserRestrict.restrict(["user"]), Cart.addToCart)
  .put(protect, UserRestrict.restrict(["user"]), Cart.removeCart);
// .post(protect, User.addToCart)
//.delete(protect, User.delFromCart);

module.exports = router;
