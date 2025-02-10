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
  Timetable,
} = require("./model");
const { mongoose } = require("mongoose");

const loginWithEmail = async (campus, email, password) => {
  try {
    const user = await User.findOne({
      email: email,
      campus: new mongoose.Types.ObjectId(campus), // must be done by this
    }).select("_id name email FEID password role");
    if (!user) {
      return {
        error: "Tài khoản hoặc mật khẩu không đúng",
        isOk: false,
      };
    }
    const timetable = await Timetable.findOne({
      user: new mongoose.Types.ObjectId(user._id),
    }).select("timeline");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        error: "Tài khoản hoặc mật khẩu không đúng",
        isOk: false,
      };
    }
    const userObject = user.toObject();
    delete userObject.password;
    if (timetable) {
      userObject.timetable = timetable.timeline;
    }
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
          });
          if (resp) {
            const lessonWithQuestions = await Question.find({
              lesson: new mongoose.Types.ObjectId(resp?._id),
            });

            resp = {
              ...resp._doc,
              questions: lessonWithQuestions,
            };
          }

          return resp;
        })
      );
      const courseMeetings = await Meeting.findOne({
        courseId: new mongoose.Types.ObjectId(course?._id),
      });
      course = {
        ...course._doc,
        lessons: courseWithLesson,
        meetings: courseMeetings?.meetings,
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
    });

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
    const extractSubmissions = await Promise.all(
      submissions.map(async (submission) => {
        const comments = await Comment.find({
          submission: submission._id.toString(),
        }).select("content date user");
        const submissionsWithUsers = await User.findOne({
          _id: submission.user,
        }).select("name FEID email role");
        const commentsWithUsers = await Promise.all(
          comments.map(async (comment) => {
            const user = await User.findOne({
              _id: comment?.user,
            }).select("name FEID email role");
            return { ...comment?._doc, user: user };
          })
        );
        return {
          ...submission?._doc,
          comments: commentsWithUsers,
          user: submissionsWithUsers,
        };
      })
    );
    return {
      submissions: extractSubmissions,
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
  console.log(content, question, user);
  try {
    const submission = new Submission({
      content: content,
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
      error: "Không thể tạo bài nộp " + error,
      isOk: false,
    };
  }
};

const postSubmissionComment = async (question, submission, content, user) => {
  try {
    const newComment = new Comment({
      content: content,
      submission: submission,
      user: user,
    });
    await newComment.save();
    const allSubmissions = await getSubmissionsByQuestion(question);
    return {
      allSubmissions: allSubmissions?.submissions,
      isOk: true,
    };
  } catch (error) {
    return {
      error: "Không thể tạo bình luận " + error,
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

// Question query

const addQuestion = async (content, status, lesson, type) => {
  try {
    const question = new Question({
      content: content,
      status: false,
      lesson: lesson,
      type: type,
    });

    await question.save();

    return {question, isOk: true};
  } catch (error) {
    return {error, isOk: false};
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
  addQuestion
};
