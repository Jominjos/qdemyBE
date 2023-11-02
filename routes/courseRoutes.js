const Course = require("../controller/courseController");

const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

//Course Routes
router.get("/", protect, Course.getCourses);
router.post("/", protect, Course.addCourse);
router.put("/", protect, Course.editCourse);
router.post("/del", protect, Course.deleteCourse);

module.exports = router;
