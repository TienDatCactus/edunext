const { Router } = require("express");
const courseRouter = Router();
const courseController = require("../controllers/courseController");

const authenticateToken = require("../validators/authenticate");
const questionController = require("../controllers/questionController");

courseRouter.get(
  "/:courseCode",
  authenticateToken,
  courseController.viewCourseDetail
);
courseRouter.get("/", authenticateToken, courseController.viewAllCourses);

courseRouter.get(
  "/:courseCode/meetings",
  authenticateToken,
  courseController.viewCourseMeetings
);
courseRouter.get("/:courseId/students", courseController.viewCourseStudents);
courseRouter.get(
  "/api/coursera/:keywords",
  authenticateToken,
  courseController.getCourseraCourses
);

courseRouter.get(
  "/instructor/:userId",
  authenticateToken,
  courseController.viewCourseByInstructor
);
courseRouter.put(
  "/changeStatus/:courseCode",
  authenticateToken,

  courseController.changeStatusCourses
);

module.exports = courseRouter;
