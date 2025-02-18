const { error } = require("console");
const query = require("../db/queries");

const createQuestion = async (req, res) => {
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

module.exports = { createQuestion, getAllQuestions };
