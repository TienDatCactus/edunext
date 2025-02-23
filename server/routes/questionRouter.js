const { Router } = require("express");
const questionRouter = Router();

const questionController = require("../controllers/questionController");
const authenticateToken = require("../validators/authenticate");

questionRouter.post("/addQuestion", questionController.createQuestion);
questionRouter.get(
  "/getQuestions/:lessonId",
  authenticateToken,
  questionController.getAllQuestions
);
questionRouter.post("/create", async (req, res) => {
  try {
    const { lessonId, question, options, answer } = req.body;
    const newQuestion = await query.createQuestion(
      lessonId,
      question,
      options,
      answer
    );
    if (newQuestion?.isOk === false) {
      return res.json({ error: newQuestion?.error, isOk: newQuestion?.isOk });
    } else if (newQuestion?.isOk === true) {
      res.json({
        newQuestion: newQuestion?.newQuestion,
        isOk: newQuestion?.isOk,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error ", isOk: false });
  }
});
questionRouter.get("/list", async (req, res) => {
  try {
    const questions = await query.getAllQuestions();
    if (questions?.isOk === false) {
      return res.json({ error: questions?.error, isOk: questions?.isOk });
    } else if (questions?.isOk === true) {
      res.json({ questions: questions?.questions, isOk: questions?.isOk });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
});
questionRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, answer } = req.body;
    const updatedQuestion = await query.updateQuestion(
      id,
      question,
      options,
      answer
    );
    if (updatedQuestion?.isOk === false) {
      return res.json({
        error: updatedQuestion?.error,
        isOk: updatedQuestion?.isOk,
      });
    } else if (updatedQuestion?.isOk === true) {
      res.json({
        updatedQuestion: updatedQuestion?.updatedQuestion,
        isOk: updatedQuestion?.isOk,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
});

questionRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await query.deleteQuestion(id);
    if (deletedQuestion?.isOk === false) {
      return res.json({
        error: deletedQuestion?.error,
        isOk: deletedQuestion?.isOk,
      });
    } else if (deletedQuestion?.isOk === true) {
      res.json({
        deletedQuestion: deletedQuestion?.deletedQuestion,
        isOk: deletedQuestion?.isOk,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
});

questionRouter.put(
  "/reset-deadline/:id",
  authenticateToken,
  questionController.resetQuestionDeadline
);

module.exports = questionRouter;
