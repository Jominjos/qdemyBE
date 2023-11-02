const Course = require("../models/coursesModel");

module.exports = {
  getCourses: async (req, res, next) => {
    const dbdata = await Course.find();
    res.json({ courseDetails: dbdata });
  },
  addCourse: async (req, res) => {
    const dbdata = await Course.create(req.body);
    res.json(dbdata);
  },
  editCourse: async (req, res) => {
    //console.log(req.body);
    const editData = req.body;
    const dbdata = await Course.updateOne(
      { _id: req.body._id },
      {
        $set: {
          courseName: editData.courseName,
          courseimg: editData.courseimg,
          fees: editData.fees,
        },
      }
    );
    res.json(dbdata);
    console.log(dbdata);
  },

  deleteCourse: async (req, res) => {
    const delData = req.body;
    //console.log(delData);
    const dbdata = await Course.deleteOne({ _id: delData._id });
    res.json(dbdata);
  },
};
