const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const {
  User,
  Semester,
  Course,
  Lesson,
  Question,
  Submission,
  Meeting,
  Tag,
  Comment,
  Campus,
} = require("./model");
const { mongoose } = require("mongoose");

const loginWithEmail = async (campus, email, password) => {
  try {
    const user = await User.findOne({
      email: email,
      campus: new mongoose.Types.ObjectId(campus), // must be done by this
    }).select("password");
    console.log(user);
    if (!user) {
      return {
        error: "Tài khoản hoặc mật khẩu không đúng",
        isOk: false,
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        error: "Tài khoản hoặc mật khẩu không đúng",
        isOk: false,
      };
    }
    const userObject = user.toObject();
    delete userObject.password;
    return { user: userObject, isOk: true };
  } catch (error) {
    return {
      error: "Lỗi đăng nhập" + error,
      isOk: false,
    };
  }
};

const loginWithId = async (campus, id) => {
  try {
    const user = await User.findOne({
      FEID: id,
      "campus.campusName": campus,
    });

    if (!user) {
      return {
        error: "Tài khoản hoặc mật khẩu không đúng",
        isOk: false,
      };
    }

    return { user: user.toObject(), isOk: true };
  } catch (error) {
    return {
      error: "Lỗi đăng nhập",
      isOk: false,
    };
  }
};

const getCurrentSemester = async (year, month) => {
  try {
    const semester = await Semester.findOne({
      year,
      semesterName: month.toUpperCase(),
    });

    if (!semester) {
      return {
        error: "Học kì không hợp lệ",
        isOk: false,
      };
    }

    return semester.toObject();
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin học kỳ",
      isOk: false,
    };
  }
};

const getCurrentCourses = async (year, month) => {
  try {
    const semester = await getCurrentSemester(year, month);
    if (!semester || semester.isOk === false) {
      return {
        error: semester?.error || "Học kì không hợp lệ",
        isOk: false,
      };
    }

    const courses = await Course.find({
      "semester.semesterName": semester.semesterName,
      "semester.year": semester.year,
      status: "active",
    });

    if (!courses.length) {
      return {
        error: "Không có khóa học nào",
        isOk: false,
      };
    }

    return { courses: courses.map((course) => course.toObject()), isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy danh sách khóa học",
      isOk: false,
    };
  }
};

const getCourseDetail = async (courseId) => {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return {
        error: "Không tìm thấy khóa học",
        isOk: false,
      };
    }

    return { course: course.toObject(), isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin khóa học",
      isOk: false,
    };
  }
};

const getCourseLessons = async (courseId) => {
  try {
    // Since lessons are embedded in course, first get the course
    const course = await Course.findById(courseId);
    if (!course) {
      return {
        error: "Không tìm thấy khóa học",
        isOk: false,
      };
    }

    // Get all lessons for this course
    const lessons = await Lesson.find({
      "course.courseCode": course.courseCode,
    });

    if (!lessons.length) {
      return {
        error: "Không tìm thấy bài học",
        isOk: false,
      };
    }

    // Get questions and tags for the first lesson
    const questions = await Question.find({
      "lesson.title": lessons[0].title,
    }).select("content");

    const tags = await Tag.find({
      "lessons.title": lessons[0].title,
    }).select("tagName");

    return {
      lessons: {
        lessons: lessons.map((lesson) => lesson.toObject()),
        questions: questions.map((question) => question.toObject()),
        tags: tags.map((tag) => tag.toObject()),
      },
      isOk: true,
    };
  } catch (error) {
    return {
      error: "Lỗi lấy danh sách bài học",
      isOk: false,
    };
  }
};

const getQuestionById = async (questionId) => {
  try {
    const question = await Question.findById(questionId).select("content");

    if (!question) {
      return {
        error: "Không tìm thấy câu hỏi",
        isOk: false,
      };
    }

    return { question: question.toObject(), isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin câu hỏi",
      isOk: false,
    };
  }
};

const getSubmissionsByQuestion = async (questionId) => {
  try {
    const submissions = await Submission.find({
      "question._id": questionId,
    });
    if (!submissions.length) {
      return {
        error: "Không tìm thấy bài nộp",
        isOk: false,
      };
    }

    return {
      submissions: submissions.map((submission) => submission.toObject()),
      isOk: true,
    };
  } catch (error) {
    return {
      error: "Lỗi lấy danh sách bài nộp",
      isOk: false,
    };
  }
};

const getCampuses = async () => {
  try {
    const campuses = await Campus.find();
    if (!campuses.length) {
      return {
        error: "Không tìm thấy trường",
        isOk: false,
      };
    }
    return { campuses, isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin trường",
      isOk: false,
    };
  }
};
const getMeetingByCourse = async (courseId) => {
  try {
    const meetings = await Meeting.find({
      "course._id": courseId,
    }).select("meetingType meetingLink");

    const remainQuestions = await Question.find({
      "course._id": courseId,
      status: false,
    }).select("status");

    if (!meetings.length) {
      return {
        error: "Không tìm thấy thông tin cuộc họp",
        isOk: false,
      };
    }

    return {
      meetings: meetings.map((meeting) => meeting.toObject()),
      remainQuestions: remainQuestions.map((question) => question.toObject()),
      isOk: true,
    };
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin cuộc họp",
      isOk: false,
    };
  }
};

const postQuestionSubmission = async (content, question, user) => {
  try {
    const submission = new Submission({
      submissionContent: content,
      submissionDate: new Date(),
      question, // Embedding full question object
      user, // Embedding full user object
      comments: [],
    });

    await submission.save();

    const allSubmissions = await Submission.find({
      "question._id": question._id,
    });

    return {
      submission: submission.toObject(),
      allSubmissions: allSubmissions.map((sub) => sub.toObject()),
      isOk: true,
    };
  } catch (error) {
    return {
      error: "Không thể tạo bài nộp",
      isOk: false,
    };
  }
};

const postSubmissionComment = async (
  questionId,
  submission,
  commentContent,
  user
) => {
  try {
    const newComment = new Comment({
      commentContent,
      commentDate: new Date(),
      submission, // Embedding full submission object
      user, // Embedding full user object
    });

    await newComment.save();

    // Update the submission with the new comment
    await Submission.findByIdAndUpdate(submission._id, {
      $push: { comments: newComment.toObject() },
    });

    const allSubmissions = await Submission.find({
      "question._id": questionId,
    });

    return {
      comment: newComment.toObject(),
      allSubmissions: allSubmissions.map((sub) => sub.toObject()),
      isOk: true,
    };
  } catch (error) {
    return {
      error: "Không thể tạo bình luận",
      isOk: false,
    };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ FEID: id });

    if (!user) {
      return {
        error: "Không tìm thấy người dùng",
        isOk: false,
      };
    }

    return { user: user.toObject(), isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin người dùng",
      isOk: false,
    };
  }
};

module.exports = {
  loginWithEmail,
  loginWithId,
  getCurrentCourses,
  getCourseDetail,
  getCourseLessons,
  getQuestionById,
  getMeetingByCourse,
  postQuestionSubmission,
  getSubmissionsByQuestion,
  postSubmissionComment,
  getUserById,
  getCampuses,
};
