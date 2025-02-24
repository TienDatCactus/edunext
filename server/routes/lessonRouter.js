const express = require("express");
const router = express.Router();
const { sortLessonsByStatus } = require("../controllers/lessonController");

router.get("/sort", sortLessonsByStatus);

module.exports = router;
