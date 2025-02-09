const { Router } = require("express");
const questionRouter = Router();

const questionController = require("../controllers/questionController");

questionRouter.post("/addQuestion", questionController.createQuestion);

module.exports = questionRouter;
