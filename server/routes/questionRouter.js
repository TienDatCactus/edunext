const { Router } = require("express");
const questionRouter = Router();

const questionController = require("../controllers/questionController");
const authenticateToken = require("../validators/authenticate");

questionRouter.post("/addQuestion", authenticateToken, questionController.createQuestions);
questionRouter.get(
  "/getQuestions/:lessonId",
  authenticateToken,
  questionController.getAllQuestions
);
questionRouter.put("/edit/:id", questionController.updateQuestion);
questionRouter.delete("/delete/:id", questionController.deletedQuestion);
questionRouter.get(
  "/question/:questionId",
  authenticateToken,
  questionController.viewQuestionDetail
);
questionRouter.get(
  "/question/:questionId/submissions",
  authenticateToken,
  questionController.viewQuestionSubmissions
);
questionRouter.post(
  "/question/:questionId",
  authenticateToken,
  questionController.addQuestionSubmission
);
questionRouter.post(
  "/question/:questionId/submission/:submissionId/comment",
  authenticateToken,
  questionController.addSubmissionComment
);
module.exports = questionRouter;
