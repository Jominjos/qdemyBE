const Course = require("../controller/courseController");

const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

//Course Routes
router.get("/", Course.getCourses);
router.post("/", Course.addCourse);
router.put("/", Course.editCourse);
router.post("/del", Course.deleteCourse);

module.exports = router;
