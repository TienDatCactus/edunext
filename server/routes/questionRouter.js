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
questionRouter.put("/edit/:id", authenticateToken, questionController.updateQuestion);
questionRouter.delete("/delete/:id", authenticateToken, questionController.deletedQuestion);
module.exports = questionRouter;
