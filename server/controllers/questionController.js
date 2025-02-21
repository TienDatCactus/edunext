const { error } = require("console");
const query = require("../db/queries");

const createQuestions = async (req, res) => {
  try {
    const questions = req.body;

    const newQuestion = await query.addQuestion(questions);
    if (newQuestion?.isOk) {
      return res.status(200).json({
        data: newQuestion?.result,
        isOk: newQuestion?.isOk,
      });
    }

    return res.status(400).json({
      error: newQuestion?.error,
      isOk: newQuestion?.isOk,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getAllQuestions = async (req, res) => {
  try {

    // Array questions
    const lessonId = req.params.lessonId;
    const questions = await query.getQuestions(lessonId);
    if (questions?.isOk === false)
      return res
        .status(404)
        .json({ error: questions?.error, isOk: questions?.isOk });
    return res.status(200).json({
      data: questions,
      isOk: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      isOk: false,
    });
  }
};

const updateQuestion = async (req, res) => {
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
}


const deletedQuestion = async (req, res) => {
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
}

module.exports = { createQuestions, getAllQuestions, updateQuestion, deletedQuestion };
