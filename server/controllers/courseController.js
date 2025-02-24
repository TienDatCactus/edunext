const { default: axios, all } = require("axios");
const query = require("../db/queries");
const { error } = require("console");
const { default: mongoose, Types } = require("mongoose");
const { User, Course, Lesson, LessonGroup } = require("../db/model");
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
    console.log(resp)
    
    if (!resp || resp.length === 0) {
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
const viewCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;
    const resp = await query.getCourseStudents(courseId);
    if (!resp || resp.length === 0) {
      return res.status(404).json({ message: "Không có sinh viên nào" });
    }
    res.status(200).json({ students: resp, isOk: true });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sinh viên :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const randomGroupForStudent = async (req, res) => {
  try {
    const courseID = req.query.courseId;
    const amount = req.query.amount;
    const studentList = await query.getCourseStudents(courseID);
    if (!studentList || studentList.length === 0) {
      return res.status(404).json({ message: "Không có sinh viên nào" });
    }
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    function createTeams(studentList, amount) {
      shuffleArray(studentList);
      const teams = [];
      const baseSize = Math.floor(studentList.length / amount);  
      const remainder = studentList.length % amount;  
      let currentTeam = [];
      let teamNumber = 1;
      for (let i = 0; i < studentList.length; i++) {
        currentTeam.push(studentList[i]);
        const isLastTeam = (teamNumber === amount) || currentTeam.length === baseSize + (teamNumber <= remainder ? 1 : 0);
        if (isLastTeam || currentTeam.length === baseSize + (teamNumber <= remainder ? 1 : 0)) {
          teams.push({ team: teamNumber, members: currentTeam });
          currentTeam = [];
          teamNumber++;
        }
      }
      if (currentTeam.length > 0) {
        teams.push({ team: teamNumber, members: currentTeam });
      }
      return teams;
    }
    const teams = createTeams(studentList, amount);
    const lessonGroups = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const userIds = team.members.map(student => student._id); 
      const lessonGroup = new LessonGroup({
        userId: userIds,  
        course: courseID, 
        team: team.team  
      });
      const savedStudentGroup = await lessonGroup.save();
      lessonGroups.push(savedStudentGroup);  
    }
    res.status(201).json({ message: "Teams created successfully", lessonGroups });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  viewCourseDetail,
  viewCourseMeetings,
  getCourseraCourses,
  viewAllCourses,
  changeStatusCourses,
  viewCourseByInstructor,
  viewCourseStudents,
  randomGroupForStudent,
};
