const jwt = require("jsonwebtoken");

const generateToken = (res, name) => {
  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
};

module.exports = generateToken;
