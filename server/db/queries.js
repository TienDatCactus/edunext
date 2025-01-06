const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");

const loginWithEmail = async (campus, email, password) => {
  const user = await prisma.user.findFirst({
    where: { email: email, campusId: Number(campus) },
    include: { campus: true },
  });
  if (user !== null) {
    const match = await bcrypt.compare(password, user.password);
    if (match === true) {
      return {
        user: user,
        isOk: true,
      };
    }
  }
  return {
    error: "Tài khoản hoặc mật khẩu không đúng",
    isOk: false,
  };
};

const loginWithId = async (campus, id) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (user) {
    return {
      user: user,
      isOk: true,
    };
  }

  return {
    error: "Tài khoản hoặc mật khẩu không đúng",
    isOk: false,
  };
};

const getCurrentSemester = async (year, month) => {
  const semester = await prisma.semester.findFirst({
    where: {
      AND: [
        {
          year: year,
        },
        {
          semesterName: month.toUpperCase(),
        },
      ],
    },
  });
  if (semester) {
    return semester;
  }
  return {
    error: "Học kì không hợp lệ",
    isOk: false,
  };
};

const getCurrentCourses = async (year, month) => {
  const semester = await getCurrentSemester(year, month);
  if (semester?.isOk === false) {
    return {
      error: semester?.error,
      isOk: semester?.isOk,
    };
  }
  const courses = await prisma.course.findMany({
    where: {
      semesterId: semester.semesterId,
    },
  });
  if (courses) {
    return {
      courses: courses,
      isOk: true,
    };
  }
  return {
    error: "Không có khóa học nào",
    isOk: false,
  };
};

const getCourseDetail = async (courseId) => {
  const course = await prisma.course.findUnique({
    where: {
      courseId: Number(courseId),
    },
  });
  if (course) {
    return { course: course, isOk: true };
  }
  return {
    error: "Không tìm thấy khóa học",
    isOk: false,
  };
};

const getCourseLessons = async (courseId) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: Number(courseId),
    },
    select: {
      lessonId: true,
      title: true,
      content: true,
      deadline: true,
      Tag: true,
      Question: {
        select: {
          questionId: true,
        },
      },
    },
  });
  if (lessons) {
    return { lessons: lessons, isOk: true };
  }
  return {
    error: "Không tìm thấy bài học",
    isOk: false,
  };
};

const getQuestionById = async (questionId) => {
  const question = await prisma.question.findUnique({
    where: {
      questionId: Number(questionId),
    },
    select: {
      content: true,
      questionId: true,
    },
  });
  if (question) {
    return { question: question, isOk: true };
  }
  return {
    error: "Không tìm thấy câu hỏi",
    isOk: false,
  };
};

const getSubmissionsByQuestion = async (questionId) => {
  const submissions = await prisma.submission.findMany({
    where: {
      questionId: Number(questionId),
    },
    select: {
      submissionId: true,
      submissionContent: true,
      submissionDate: true,
      user: {
        select: {
          name: true,
          userId: true,
        },
      },
      comments: {
        select: {
          submissionId: true,
          commentId: true,
          commentContent: true,
          commentDate: true,
          user: {
            select: {
              name: true,
              userId: true,
            },
          },
        },
      },
    },
  });
  if (submissions) {
    return { submissions: submissions, isOk: true };
  }
  return {
    error: "Không tìm thấy bài nộp",
    isOk: false,
  };
};

const getMeetingByCourse = async (courseId) => {
  const meetings = await prisma.meeting.findMany({
    where: {
      courseId: Number(courseId),
    },
    select: {
      meetingId: true,
      meetingType: true,
      meetingLink: true,
    },
  });
  const remainQuestions = await prisma.question.findMany({
    where: {
      lessonId: 1,
    },
    select: {
      questionId: true,
      status: true,
    },
  });
  if (meetings) {
    return { meetings: meetings, remainQuestions: remainQuestions, isOk: true };
  }
  return {
    error: "Không tìm thấy thông tin cuộc họp",
    isOk: false,
  };
};

const postQuestionSubmission = async (content, questionId, userId) => {
  const submission = await prisma.submission.create({
    data: {
      submissionContent: content,
      submissionDate: dayjs().toISOString(),
      Question: {
        connect: {
          questionId: Number(questionId),
        },
      },
      user: {
        connect: {
          userId: Number(userId),
        },
      },
    },
  });
  const allSubmission = await prisma.submission.findMany({
    where: {
      questionId: Number(questionId),
    },
    select: {
      submissionId: true,
      submissionContent: true,
      submissionDate: true,
      user: {
        select: {
          name: true,
          userId: true,
        },
      },
      comments: {
        select: {
          submissionId: true,
          commentId: true,
          commentContent: true,
          commentDate: true,
          user: {
            select: {
              name: true,
              userId: true,
            },
          },
        },
      },
    },
  });
  if (submission) {
    return { submission: submission, allSubmission: allSubmission, isOk: true };
  }
  return {
    error: "Không thể tạo bài nộp",
    isOk: false,
  };
};

const postSubmissionComment = async (
  questionId,
  submissionId,
  comment,
  userId
) => {
  const newComment = await prisma.comment.create({
    data: {
      commentContent: comment,
      commentDate: dayjs().toISOString(),
      submission: {
        connect: {
          submissionId: Number(submissionId),
        },
      },
      user: {
        connect: {
          userId: Number(userId),
        },
      },
    },
  });
  const allSubmission = await prisma.submission.findMany({
    where: {
      questionId: Number(questionId),
    },
    select: {
      submissionId: true,
      submissionContent: true,
      submissionDate: true,
      user: {
        select: {
          name: true,
          userId: true,
        },
      },
      comments: {
        select: {
          submissionId: true,
          commentId: true,
          commentContent: true,
          commentDate: true,
          user: {
            select: {
              name: true,
              userId: true,
            },
          },
        },
      },
    },
  });
  if (newComment) {
    return { newComment: newComment, allSubmission: allSubmission, isOk: true };
  }
  return {
    error: "Không thể tạo bình luận",
    isOk: false,
  };
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
};
