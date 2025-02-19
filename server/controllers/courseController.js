const { default: axios, all } = require("axios");
const query = require("../db/queries");
const { error } = require("console");
const { default: mongoose, Types } = require("mongoose");
const { User, Course, Lesson } = require("../db/model");
const { json } = require("express");

const viewCourseDetail = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const course = await query.getCourseDetail(courseCode);
    if (course?.isOk === false) {
      return res.status(400).json({
        error: course?.error,
        isOk: false,
      });
    }
    res.json({
      course: course?.course,
      isOk: true,
    });
  } catch (error) {
    console.error("Course detail fetch error:", error);
    res.status(500).json({ error: "Internal server error ", isOk: false });
  }
};

const viewQuestionDetail = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await query.getQuestionById(questionId);
    if (question?.isOk === false) {
      return res.status(400).json({ error: question?.error, isOk: false });
    }
    res.json({ question: question?.question, isOk: true });
  } catch (error) {
    console.error("Question fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const viewCourseMeetings = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const meetings = await query.getMeetingByCourse(courseCode);
    if (meetings?.isOk === false) {
      return res.status(400).json({ error: meetings?.error, isOk: false });
    }
    res.json({
      meetings: meetings?.meetings,
      remainQuestions: meetings?.remainQuestions,
      isOk: true,
    });
  } catch (error) {
    console.error("Meeting fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const addQuestionSubmission = async (req, res) => {
  const { questionId } = req.params;
  const { content, userId } = req.body;
  try {
    const newSubmission = await query.postQuestionSubmission(
      content,
      questionId,
      userId
    );
    if (newSubmission?.isOk === false) {
      return res.status(400).json({ error: newSubmission?.error, isOk: false });
    }
    res.json({
      allSubmission: newSubmission?.allSubmissions,
      isOk: true,
    });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const viewQuestionSubmissions = async (req, res) => {
  const { questionId } = req.params;
  try {
    const submissions = await query.getSubmissionsByQuestion(questionId);
    if (submissions?.isOk === false) {
      return res.status(400).json({ error: submissions?.error, isOk: false });
    }
    res.json({ submissions: submissions?.submissions, isOk: true });
  } catch (error) {
    console.error("Submission fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const addSubmissionComment = async (req, res) => {
  const { questionId, submissionId } = req.params;
  const { content, user } = req.body;
  try {
    const cmt = await query.postSubmissionComment(
      questionId,
      submissionId,
      content,
      user
    );
    if (cmt?.isOk === false) {
      return res.status(400).json({ error: cmt?.error, isOk: false });
    }
    res.json({
      allSubmission: cmt?.allSubmissions,
      isOk: true,
    });
  } catch (error) {
    console.error("  error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};
const getCourseraCourses = async (req, res) => {
  const { keyword } = req.params;
  try {
    const resp = await axios.get(
      `${process.env.COURSERA_API_URL}?q=search&query=${keyword}&fields=id,name,description,photoUrl,instructorIds,partnerIds,language,domainTypes,workload,previewLink`
    );
    const courses = resp.data.elements.map((course) => ({
      id: course.id,
      name: course.name,
      description: course.description || "No description available.",
      photoUrl: course.photoUrl || "https://via.placeholder.com/300", // Placeholder if no image
      language: course.language || "Unknown",
      domainTypes: course.domainTypes || [],
      workload: course.workload || "Not specified",
      previewLink:
        course.previewLink || `https://www.coursera.org/learn/${course.slug}`,
    }));
    res.json({ courses: courses, isOk: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};
const viewAllCourses = async (req, res) => {
  try {
    const resp = await query.getAllCourses();
    if (!resp || result.resp === 0) {
      return res.status(404).json({ message: "Không có" });
    }
    res.status(200).json(resp);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeStatusCourses = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const result = await query.getCourseDetail(courseCode);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Không có" });
    }
    let newStatus;
    if (result?.course?.status == "active") {
      newStatus = "inactive";
    } else if (result?.course?.status == "inactive") {
      newStatus = "active";
    }
    const updateResult = await query.changeStatusCourses(courseCode, newStatus);
    if (!updateResult || updateResult.length === 0) {
      return res.status(404).json({ message: "Không có" });
    }
    res.status(200).json(updateResult);
  } catch (error) {
    console.error("Lỗi :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewCourseByInstructor = async (req, res) => {
  try {
    const { userId } = req.params;
    const resp = await query.getCourseByInstructor(userId);

    if (!resp || resp.length === 0) {
      return res.status(404).json({ message: "Không có môn nào", isOk: false });
    }
    res.status(200).json({ courses: resp, isOk: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " + error });
  }
};
module.exports = {
  viewCourseDetail,
  viewQuestionDetail,
  viewCourseMeetings,
  addQuestionSubmission,
  viewQuestionSubmissions,
  addSubmissionComment,
  getCourseraCourses,
  viewAllCourses,
  changeStatusCourses,
  viewCourseByInstructor,
};
