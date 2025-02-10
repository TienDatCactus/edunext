
const query = require("../db/queries");

 const createQuestion = async (req, res) => {
  const { content, status, lesson, type } = req.body;

  try {
    const newQuestion = await query.addQuestion(content, status, lesson, type);
    if (newQuestion?.isOk) {
      return res.status(200).json({
        data: newQuestion?.question,
        isOk: newQuestion?.isOk,
      });
    }

    return res.status(400).json({
      error: newQuestion?.error,
      isOk: newQuestion?.isOk,
    });
  } catch (error) {
    return res.status(500).json({error});
  }
};


module.exports = {createQuestion}