const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

module.exports = {
  //USER AUTHENTICATION
  authUser: asyncHandler(async (req, res, next) => {
    //console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);
    if (user && (await user.matchPasswords(password))) {
      let token = generateToken(res, user.name);
      let username = user.name;

      res
        .status(200)
        .json({ message: "login success", token: token, username: username });
    } else {
      res.status(401).json({ error: "email or password is incorrect" });
    }
  }),
  //
  //CREATE USER
  createUser: asyncHandler(async (req, res, next) => {
    try {
      const userData = req.body;

      // Check if the email address already exists
      const existingEmailUser = await User.findOne({ email: userData.email });
      if (existingEmailUser) {
        return res.status(400).json({ error: "Email address already in use" });
      }

      // Check if the username already exists
      const existingUsernameUser = await User.findOne({ name: userData.name });
      if (existingUsernameUser) {
        return res.status(400).json({ error: "Username already in use" });
      }

      const dbdata = await User.create(req.body);
      generateToken(res, dbdata.user);

      res.status(200).json({ dbdata });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "User creation failed" });
    }
  }),
  //
  //UPDATE USER PUT
  updateUser: asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: req.user });
  }),
  // Get cart

  //Logout user

  logoutUser: asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logout success" });
  }),
  // GET USER
  getUser: asyncHandler(async (req, res, next) => {
    res.json({
      message: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }),
};
