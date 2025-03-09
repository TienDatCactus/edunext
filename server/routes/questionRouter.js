const { Router } = require("express");
const questionRouter = Router();

const questionController = require("../controllers/questionController");
const authenticateToken = require("../validators/authenticate");

questionRouter.post(
  "/addQuestion",
  authenticateToken,
  questionController.createQuestions
);
questionRouter.get(
  "/getQuestions/:lessonId",
  authenticateToken,
  questionController.getAllQuestions
);
questionRouter.put("/edit/:id", questionController.updateQuestion);
questionRouter.delete("/delete/:id", questionController.deletedQuestion);
questionRouter.get(
  "/:questionId",
  authenticateToken,
  questionController.viewQuestionDetail
);
questionRouter.get(
  "/:questionId/submissions",
  authenticateToken,
  questionController.viewQuestionSubmissions
);
questionRouter.post(
  "/submit/:questionId",
  authenticateToken,
  questionController.addQuestionSubmission
);
questionRouter.post(
  "/:questionId/submission/:submissionId/comment",
  authenticateToken,
  questionController.addSubmissionComment
);

questionRouter.put(
  "/reset-deadline/:id",
  authenticateToken,
  questionController.resetQuestionDeadline
);

module.exports = questionRouter;
