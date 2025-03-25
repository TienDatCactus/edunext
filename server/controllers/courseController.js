const { default: axios, all, request } = require("axios");
const query = require("../db/queries");
const { error, log } = require("console");
const { default: mongoose, Types } = require("mongoose");
const { User, Course, Lesson, LessonGroup } = require("../db/model");
const { json } = require("express");
const { locale } = require("dayjs");
const { url } = require("inspector");
const { features } = require("process");

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
const getUdemyCourses = async (req, res) => {
  const { keywords, pages } = req.query;

  if (!keywords) {
    return res.status(400).json({ error: "Missing keywords" });
  }
  const options = {
    method: "POST",
    url: `https://udemy-api2.p.rapidapi.com/v1/udemy/category/${keywords}`,
    headers: {
      "x-rapidapi-key": "23f6c4678fmsh60a151904aa61e4p1df63bjsn03ca2aad09db",
      "x-rapidapi-host": "udemy-api2.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      page: pages,
      page_size: 1,
      ratings: "",
      instructional_level: [],
      lang: [],
      price: [],
      duration: [],
      subtitles_lang: [],
      sort: "popularity",
      features: [],
      locale: "en_US",
      extract_pricing: true,
    },
  };
  try {
    const response = await axios.request(options);
    console.table(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(error);
  }
};
const viewAllCourses = async (req, res) => {
  try {
    const resp = await query.getAllCourses();
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
    if (resp.length == 0) {
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
function createTeams(studentList, amount) {
  const teams = [];
  const baseSize = Math.floor(studentList.length / amount);
  const remainder = studentList.length % amount;
  let currentTeam = [];
  let teamNumber = 1;
  for (let i = 0; i < studentList.length; i++) {
    currentTeam.push(studentList[i]);
    const isLastTeam =
      teamNumber === amount ||
      currentTeam.length === baseSize + (teamNumber <= remainder ? 1 : 0);
    if (
      isLastTeam ||
      currentTeam.length === baseSize + (teamNumber <= remainder ? 1 : 0)
    ) {
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
const randomGroupForStudent = async (req, res) => {
  try {
    const lessonId = req.query.lessonId;
    const { amount } = req.body;
    const lessonCourse = await Lesson.findOne({
      _id: new mongoose.Types.ObjectId(lessonId),
    });
    const courseId = lessonCourse?.course;
    console.log(courseId);
    const studentList = await query.getCourseStudents(courseId);
    if (!studentList || !studentList.length > 0) {
      return res
        .status(404)
        .json({ message: "Không có sinh viên nào", isOk: false });
    }
    const teams = createTeams(studentList, amount);
    console.log(teams);
    const lessonGroups = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const userIds = team.members.map((student) => student._id);
      const lessonGroup = new LessonGroup({
        userId: userIds,
        course: courseId,
        team: team.team,
      });
      await lessonGroup.save().then((newDoc) => {
        lessonGroups.push(newDoc);
      });
    }
    if (lessonGroups != null) {
      res.status(201).json({
        message: "Teams created successfully",
        isOk: true,
      });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: error.message });
  }
};
const viewCourseGroups = async (req, res) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId) {
      return res.status(500).json({ error: "Lack of lessonId", isOk: false });
    }
    const resp = await query.getCourseGroups(lessonId);
    if (resp) {
      return res.status(200).json({
        groups: resp?.groups,
        isOk: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, isOk: false });
  }
};
const addCourse = async (req, res) => {
  try {
    const {
      courseName,
      description,
      courseCode,
      assignments,
      instructor,
      semester,
      lessons,
      forMajor,
      status,
    } = req.body;

    // Validate required fields
    if (!courseName || !courseCode || !instructor || !semester || !forMajor) {
      return res.status(400).json({
        error: "Vui lòng điền đầy đủ thông tin bắt buộc",
        isOk: false,
      });
    }

    // Check if course code already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({
        error: "Mã khóa học đã tồn tại",
        isOk: false,
      });
    }

    // Create new course
    const course = new Course({
      courseName,
      description,
      courseCode,
      assignments: assignments || [],
      instructor,
      semester,
      lessons: lessons || [],
      forMajor,
      status: status || "active",
    });

    await course.save();

    // Add course to semester
    await Semester.findByIdAndUpdate(
      semester,
      { $push: { courses: course._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Thêm khóa học thành công",
      course,
      isOk: true,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({
      error: "Lỗi khi thêm khóa học",
      isOk: false,
    });
  }
};
const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseName,
      description,
      courseCode,
      assignments,
      instructor,
      semester,
      lessons,
      forMajor,
      status,
    } = req.body;

    // Validate required fields
    if (!courseName || !courseCode || !instructor || !semester || !forMajor) {
      return res.status(400).json({
        error: "Vui lòng điền đầy đủ thông tin bắt buộc",
        isOk: false,
      });
    }

    // Check if course exists
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({
        error: "Không tìm thấy khóa học",
        isOk: false,
      });
    }

    // Check if new course code conflicts with other courses
    const codeConflict = await Course.findOne({
      courseCode,
      _id: { $ne: courseId },
    });
    if (codeConflict) {
      return res.status(400).json({
        error: "Mã khóa học đã tồn tại",
        isOk: false,
      });
    }

    // If semester changed, update semester references
    if (existingCourse.semester.toString() !== semester) {
      // Remove course from old semester
      await Semester.findByIdAndUpdate(existingCourse.semester, {
        $pull: { courses: courseId },
      });

      // Add course to new semester
      await Semester.findByIdAndUpdate(semester, {
        $push: { courses: courseId },
      });
    }

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseName,
        description,
        courseCode,
        assignments,
        instructor,
        semester,
        lessons,
        forMajor,
        status,
      },
      { new: true }
    );

    res.json({
      message: "Cập nhật khóa học thành công",
      course: updatedCourse,
      isOk: true,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      error: "Lỗi khi cập nhật khóa học",
      isOk: false,
    });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        error: "Không tìm thấy khóa học",
        isOk: false,
      });
    }

    // Remove course from semester
    await Semester.findByIdAndUpdate(course.semester, {
      $pull: { courses: courseId },
    });

    // Delete associated lessons
    if (course.lessons && course.lessons.length > 0) {
      await Lesson.deleteMany({ _id: { $in: course.lessons } });
    }

    // Delete associated assignments
    if (course.assignments && course.assignments.length > 0) {
      await Assignment.deleteMany({ _id: { $in: course.assignments } });
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    res.json({
      message: "Xóa khóa học thành công",
      isOk: true,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      error: "Lỗi khi xóa khóa học",
      isOk: false,
    });
  }
};

const viewCountStatistics = async (req, res) => {
  try {
    const { questionId } = req.params;
    const resp = await query.getCountStatistics(questionId);
    if (!resp || resp.length === 0) {
      return res.status(404).json({ message: "Không có" });
    }
    res.status(200).json({
      totalSubmissions: resp.totalSubmissions,
      totalComments: resp.totalComments,
      isOk: true,
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  viewCourseDetail,
  viewCourseMeetings,
  getCourseraCourses,
  getUdemyCourses,
  viewAllCourses,
  changeStatusCourses,
  viewCourseByInstructor,
  viewCourseStudents,
  randomGroupForStudent,
  viewCourseGroups,
  addCourse,
  editCourse,
  deleteCourse,
  viewCountStatistics,
};
