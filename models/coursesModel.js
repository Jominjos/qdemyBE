const { mongoose } = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseimg: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
});

module.exports = mongoose.model("course", coursesSchema);
