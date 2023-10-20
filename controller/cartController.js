const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

module.exports = {
  //get cart

  getCart: asyncHandler(async (req, res, next) => {
    //console.log(req.name);
    const dbdata = await User.find(
      { name: req.user.name },
      { name: 1, cart: 1 }
    ).populate("cart");
    res.json({ messg: { dbdata }, headers: req.headers });
  }),
  //Add to cart
  addToCart: asyncHandler(async (req, res, next) => {
    let itemId = req.body.id;
    const dbdata = await User.updateOne(
      { name: req.user.name },
      { $push: { cart: itemId } }
    );

    console.log(req.body.id);
    res.json({ message: dbdata });
  }),
  //remove from cart
  removeCart: asyncHandler(async (req, res, next) => {
    let itemId = req.body.id;
    const dbdata = await User.updateOne(
      { name: req.user.name },
      { $pull: { cart: itemId } }
    );

    console.log(req.body.id);
    res.json({ message: "itemremoved" });
  }),
};
