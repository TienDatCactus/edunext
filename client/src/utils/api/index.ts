import { User, UserToken } from "../interfaces";
import { useUserStore } from "../zustand/Store";
import http from "./axios";
import {
  accessApi,
  courseApi,
  dashboardApi,
  homeApi,
  lessonApi,
  questionApi,
} from "./urls";

const login = async (campus: string, email: string, password: string) => {
  try {
    const resp = await http.post(`${accessApi}/login`, {
      campus,
      email,
      password,
    });
    if (resp?.data?.user) {
      localStorage.setItem(
        "edu-token",
        JSON.stringify(resp?.data?.user as UserToken)
      );
    }
    return resp?.data;
  } catch (error) {
    return error;
  }
};

const getCourses = async () => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    if (user?.user?.role == "2") {
      const resp = await http.get(`${courseApi}/instructor/${user?.user?._id}`);
      if (resp?.data) return resp?.data;
    } else {
      const resp = await http.get(`${homeApi}/${user?.user?._id}`);
      if (resp?.data) return resp?.data;
    }
    return null;
  } catch (error) {
    return error;
  }
};
const getQuestionByLesson = async (lessonId: string) => {
  try {
    const resp = await http.get(`${questionApi}/getQuestions/${lessonId}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const getCourseDetail = async (courseCode: string) => {
  try {
    const resp = await http.get(`${courseApi}/${courseCode}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getQuestionDetail = async (questionId: string) => {
  try {
    const resp = await http.get(`${questionApi}/${questionId}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getCourseMeeting = async (courseCode: string) => {
  try {
    const resp = await http.get(`${courseApi}/${courseCode}/meetings`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const postQuestionSubmission = async (
  questionId?: string,
  content?: string
) => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    const resp = await http.post(`${questionApi}/submit/${questionId}`, {
      userId: user?.user?._id,
      content,
    });
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getCampuses = async () => {
  try {
    const resp = await http.get(`${accessApi}/campuses`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const getQuestionSubmission = async (questionId: string) => {
  try {
    const resp = await http.get(`${questionApi}/${questionId}/submissions`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const postSubmissionComment = async (
  comment?: string,
  questionId?: string,
  submissionId?: string
) => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    const resp = await http.post(
      `${questionApi}/question/${questionId}/submission/${submissionId}/comment`,
      {
        content: comment,
        user: user?.user?._id,
      }
    );
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getUserById = async (userId: number) => {
  try {
    const resp = await http.get(`${homeApi}/users/${userId}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    const resp = await http.post(`${accessApi}/logout`, {
      token: user?.accessToken,
    });
    if (resp?.data && resp?.data?.isOk == true) {
      localStorage.removeItem("edu-token");
      window.location.replace("/");
    }
  } catch (error) {
    return error;
  }
};
const changeCourseStatus = async (courseCode: string) => {
  try {
    const resp = await http.put(`${courseApi}/changeStatus/${courseCode}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const getCourseStudents = async (courseId: string) => {
  try {
    const resp = await http.get(`${courseApi}/${courseId}/students`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const addQuestionByTeacher = async (questions: any) => {
  try {
    const res = await http.post(`${questionApi}/addQuestion`, questions);
    if (res?.data) return res?.data;
  } catch (error) {
    return error;
  }
};
const postTimetableInfo = async (
  user: string,
  timeline: string,
  content: string,
  type: string
) => {
  try {
    const resp = await http.post(`${dashboardApi}/timetable`, {
      user,
      timeline,
      content,
      type,
    });
    if (resp?.data) return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteQuestionByTeacher = async (id: any) => {
  try {
    const res = await http.delete(`${questionApi}/delete/${id}`);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};
const getTimetableInfo = async (userId: string) => {
  try {
    const resp = await http.get(`${dashboardApi}/timetable/${userId}`);
    if (resp?.data) return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

const updateQuestionByTeacher = async (id: any, question: any) => {
  try {
    const res = await http.put(`${questionApi}/edit/${id}`, question);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};

const getAllCourses = async () => {
  try {
    const res = await http.get(`${courseApi}`);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};
const getCountStatistics = async (questionId: string) => {
  console.log(questionId);
  try {
    const resp = await http.get(`${courseApi}/${questionId}/count-statistics`);
    if (resp?.data) return resp?.data;
  } catch (error) {
    return error;
  }
};

//Lesson

const getAllLessons = async () => {
  try {
    const resp = await http.get(`${lessonApi}/`);
    if (resp?.data) return resp?.data;
  } catch (error) {
    return error;
  }
};

// Course Admin
const editCourse = async (courseId: string, course: any) => {
  try {
    const res = await http.put(`${courseApi}/editCourse/${courseId}`, course);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};
const addCourse = async (course: any) => {
  try {
    const res = await http.post(`${courseApi}/addCourse`, course);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};

const deleteCourse = async (courseId: string) => {
  try {
    const res = await http.delete(`${courseApi}/deleteCourse/${courseId}`);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};

const getAllAssignment = async () => {
  try {
    const res = await http.get(`${dashboardApi}/assignment`);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};

const getAllUser = async () => {
  try {
    const res = await http.get(`${dashboardApi}/user`);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};

const getAllSemester = async () => {
  try {
    const res = await http.get(`${dashboardApi}/semester`);
    if (res) return res?.data;
  } catch (error) {
    return error;
  }
};
const submitCode = async (code: string, questionId: string) => {
  try {
    const resp = await http.post(`${questionApi}/${questionId}/submitCode`, {
      code,
    });
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

export {
  getCampuses,
  getCourseDetail,
  getCourseMeeting,
  getCourses,
  getQuestionDetail,
  getQuestionSubmission,
  getUserById,
  login,
  logout,
  postQuestionSubmission,
  postSubmissionComment,
  getQuestionByLesson,
  changeCourseStatus,
  getCourseStudents,
  addQuestionByTeacher,
  deleteQuestionByTeacher,
  postTimetableInfo,
  getTimetableInfo,
  updateQuestionByTeacher,
  getAllCourses,
  getCountStatistics,
  editCourse,
  getAllLessons,
  getAllAssignment,
  getAllUser,
  getAllSemester,
  addCourse,
  deleteCourse,
  submitCode,
};
