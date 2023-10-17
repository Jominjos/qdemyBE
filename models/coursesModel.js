const { mongoose } = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseImg: {
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
