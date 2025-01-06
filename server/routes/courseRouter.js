const { Router } = require("express");
const courseRouter = Router();
const courseController = require("../controllers/courseController");
const authenticateToken = require("../validators/authenticate");

courseRouter.get(
  "/:courseId",
  authenticateToken,
  courseController.viewCourseDetail
);
courseRouter.get(
  "/question/:questionId",
  authenticateToken,
  courseController.viewQuestionDetail
);
courseRouter.get(
  "/question/:questionId/submissions",
  authenticateToken,
  courseController.viewQuestionSubmissions
);
courseRouter.post(
  "/question/:questionId",
  authenticateToken,
  courseController.addQuestionSubmission
);
courseRouter.post(
  "/question/:questionId/submission/:submissionId/comment",
  authenticateToken,
  courseController.addSubmissionComment
);
courseRouter.get(
  "/:courseId/meetings",
  authenticateToken,
  courseController.viewCourseMeetings
);

module.exports = courseRouter;
