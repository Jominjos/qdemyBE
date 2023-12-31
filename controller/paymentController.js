const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/userModel");
module.exports = {
  OrderPost: async (req, res) => {
    const dbdata = await User.find(
      { name: req.user.name },
      { name: 1, cart: 1 }
    ).populate("cart");
    //console.log(dbdata[0]);
    //res.json({ message: dbdata[0].cart });
    let BillAmount = 0;
    dbdata[0].cart.forEach((element) => {
      BillAmount += Number(element.fees);
    });
    console.log(BillAmount);
    try {
      const instance = new Razorpay({
        key_id: process.env.RZPAY_ID,
        key_secret: process.env.RZPAY_KEY_SECRET,
      });

      const options = {
        amount: BillAmount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  },

  //verify order
  OrderVerify: async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RZPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        await User.updateOne({ name: req.user.name }, { $set: { cart: [] } });
        return res
          .status(200)
          .json({ message: "Payment verified successfully" });
      } else {
        return res.status(400).json({ message: "Invalid signature sent!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  },
};
