const express = require("express");
const router = express.Router();
const { sortLessonsByStatus, getAllLesson } = require("../controllers/lessonController");

router.get("/sort", sortLessonsByStatus);
router.get("/", getAllLesson);


module.exports = router;
