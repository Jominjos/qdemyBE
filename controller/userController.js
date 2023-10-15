const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

module.exports = {
  //USER AUTHENTICATION
  authUser: asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
      generateToken(res, user.name);
      res.status(200).json({ message: "login success" });
    } else {
      res.status(401).json({ error: "email or password is incorrect" });
    }
  }),
  //
  //CREATE USER
  createUser: asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const dbdata = await User.create(req.body);
    generateToken(res, dbdata.user);
    const sendingData = {
      id: dbdata._id,
      name: dbdata.name,
      email: dbdata.email,
    };
    res.status(200).json({ message: sendingData });
  }),
  //
  //UPDATE USER PUT
  updateUser: asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: req.user });
  }),

  //
  //Logout user

  logoutUser: asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logout success" });
  }),
  // GET USER
  getUser: asyncHandler(async (req, res, next) => {
    res.json({ message: { name: req.user.name, email: req.user.email } });
  }),
};
