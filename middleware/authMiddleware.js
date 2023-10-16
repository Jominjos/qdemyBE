const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.accesstoken;
  // console.log(req.headers.accesstoken);
  // console.log(req.cookies);
  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

      let userdata = await User.find({ name: decoded.name }).select(
        "-password"
      );

      req.user = userdata[0];
      next();
    } catch {
      res.json({ message: "crash" });
    }
  } else {
    res.json({ message: "please login" });
  }
});

module.exports = protect;
