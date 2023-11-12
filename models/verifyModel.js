const { default: mongoose } = require("mongoose");

const verifySchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("verifyUser", verifySchema);
