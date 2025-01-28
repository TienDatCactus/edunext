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
    }).select("_id name email FEID password");
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
      error:
        "Lỗi đăng nhập " +
        error.toString().split(":")[1] +
        error.toString().split(":")[2],
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

const getCurrentCourses = async (id) => {
  try {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).select("semester");
    if (!user) {
      return {
        error: "Không có khóa học nào",
        isOk: false,
      };
    }
    const coursesId = await Semester.findOne({
      _id: new mongoose.Types.ObjectId(user?.semester),
    }).select("courses");

    if (coursesId === null) {
      return {
        error: "Không có khóa học nào",
        isOk: false,
      };
    }
    const courses = await Promise.all(
      coursesId?.courses?.map(async (id) => {
        const resp = await Course.findOne({
          _id: new mongoose.Types.ObjectId(id),
        });
        return resp;
      })
    );
    return { courses: courses, isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy danh sách khóa học " + error,
      isOk: false,
    };
  }
};

const getCourseDetail = async (courseCode) => {
  try {
    let course = await Course.findOne({
      courseCode: courseCode,
    });
    if (!course) {
      return {
        error: "Lỗi lấy thông tin khóa học",
        isOk: false,
      };
    }
    if (course?.instructor) {
      const instructor = await User.findOne({
        _id: new mongoose.Types.ObjectId(course.instructor),
      }).select("name");
      if (instructor) {
        course.instructor = instructor?.name;
      }
    }
    if (course?.lessons?.length > 0) {
      const courseWithLesson = await Promise.all(
        course?.lessons?.map(async (id) => {
          let resp = await Lesson.findOne({
            _id: new mongoose.Types.ObjectId(id),
          }).lean();
          if (resp) {
            const lessonWithQuestions = await Question.find({
              lesson: new mongoose.Types.ObjectId(resp?._id),
            }).lean();
            resp = {
              ...resp._doc,
              questions: lessonWithQuestions,
            };
          }
          return resp;
        })
      );

      course = {
        ...course._doc,
        lessons: courseWithLesson,
      };
    }
    return { course: course, isOk: true };
  } catch (error) {
    return {
      error: "Lỗi lấy thông tin khóa học " + error,
      isOk: false,
    };
  }
};

const getQuestionById = async (questionId) => {
  try {
    const question = await Question.findOne({
      _id: new mongoose.Types.ObjectId(questionId),
    }).select("_id content status course");

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
      question: questionId,
    });
    if (!submissions) {
      return {
        error: "Không tìm thấy bài nộp",
        isOk: false,
      };
    }
    const submissionsWithUsers = await Promise.all(
      submissions.map(async (submission) => {
        const user = await User.findOne({
          _id: submission.user,
        }).select("name FEID email role");
        return { ...submission?._doc, user: user };
      })
    );
    return {
      submissions: submissionsWithUsers,
      isOk: true,
    };
  } catch (error) {
    console.log(error);
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
const getMeetingByCourse = async (courseCode) => {
  try {
    const meetings = await Course.findOne({
      courseCode: courseCode,
    }).select("meetings");
    const remainQuestions = await Lesson.findOne({
      course: courseCode,
    }).select("questions");
    if (!meetings) {
      return {
        error: "Không tìm thấy thông tin cuộc họp",
        isOk: false,
      };
    }
    return {
      meetings: meetings?.meetings,
      remainQuestions: remainQuestions?.questions,
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
      question,
      user,
      comments: [],
    });
    await submission.save();
    const allSubmissions = await getSubmissionsByQuestion(question);
    return {
      allSubmissions: allSubmissions?.submissions,
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
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).select("name FEID email role _id");

    if (!user) {
      return {
        error: "Không tìm thấy người dùng",
        isOk: false,
      };
    }

    return user;
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
  getQuestionById,
  getMeetingByCourse,
  postQuestionSubmission,
  getSubmissionsByQuestion,
  postSubmissionComment,
  getUserById,
  getCampuses,
};
