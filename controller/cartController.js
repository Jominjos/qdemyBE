const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

module.exports = {
  //get cart

  getCart: asyncHandler(async (req, res, next) => {
    //console.log(req.user);
    const dbdata = await User.find(
      { name: req.user.name },
      { name: 1, cart: 1 }
    ).populate("cart");
    res.json({ messg: { dbdata }, headers: req.headers });
  }),
  //Add to cart
  addToCart: asyncHandler(async (req, res, next) => {
    let itemId = req.body.id;
    const exist = await User.findOne({
      name: req.user.name,
    });
    let itemExist = exist.cart.includes(itemId);
    if (!itemExist) {
      const dbdata = await User.updateOne(
        { name: req.user.name },
        { $push: { cart: itemId } }
      );

      res.status(200).json({ message: "item added in cart", alert: false });
    } else {
      res.json({ message: "item already in cart", alert: true });
    }
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
