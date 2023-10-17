const Course = require("../controller/courseController");

const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

//Course Routes
router.get("/", Course.getCourses);

module.exports = router;
