const express = require("express");
const router = express.Router();
const { sortLessonsByStatus } = require("../controllers/lessonController");

router.get("/sort/status", sortLessonsByStatus);

module.exports = router;
