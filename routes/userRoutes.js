const express = require("express");
const User = require("../controller/userController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

//user Routes
router.post("/", User.createUser);
router.post("/auth", User.authUser);
router.post("/logout", User.logoutUser);
router
  .route("/profile")
  .get(protect, User.getUser)
  .put(protect, User.updateUser);

module.exports = router;
