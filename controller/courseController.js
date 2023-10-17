const Course = require("../models/coursesModel");

module.exports = {
  getCourses: async (req, res, next) => {
    const dbdata = await Course.find();
    res.json({ courseDetails: dbdata });
  },
};
