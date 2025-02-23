const { error } = require("console");
const query = require("../db/queries");
const dayjs = require("dayjs");
const Question = require("../db/model").Question;

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

const resetQuestionDeadline = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDeadline } = req.body;

    if (!newDeadline) {
      return res.status(400).json({
        error: "New deadline is required",
        isOk: false,
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      {
        createdAt: dayjs().toDate(),
        updatedAt: dayjs(newDeadline).toDate(),
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        error: "Question not found",
        isOk: false,
      });
    }

    res.json({
      updatedQuestion,
      isOk: true,
      message: "Question deadline reset successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      isOk: false,
    });
  }
};

module.exports = { createQuestion, getAllQuestions, resetQuestionDeadline };
