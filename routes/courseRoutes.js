const Course = require("../controller/courseController");

const express = require("express");
const protect = require("../middleware/authMiddleware");
const UserRestrict = require("../middleware/restrictMiddleware");
const router = express.Router();

//Course Routes
router.get(
  "/",
  protect,
  UserRestrict.restrict(["user", "admin", "superadmin"]),
  Course.getCourses
);
router.post(
  "/",
  protect,

  UserRestrict.restrict(["admin", "superadmin"]),
  Course.addCourse
);
protect,
  router.put(
    "/",
    UserRestrict.restrict(["admin", "superadmin"]),
    Course.editCourse
  );
protect,
  router.post(
    "/del",
    protect,
    UserRestrict.restrict(["admin", "superadmin"]),
    Course.deleteCourse
  );

module.exports = router;
