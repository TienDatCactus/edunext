const express = require("express");
const router = express.Router();
const { sortLessonsByStatus, getAllLesson } = require("../controllers/lessonController");

router.get("/", getAllLesson);
router.get("/sort/status", sortLessonsByStatus);


module.exports = router;
