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
module.exports = questionRouter;
