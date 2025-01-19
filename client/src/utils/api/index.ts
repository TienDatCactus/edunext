import { UserToken } from "../interfaces";
import http from "./axios";
import { accessApi, courseApi, homeApi } from "./urls";
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
    const resp = await http.get(`${homeApi}/${user?.user?.FEID}`);
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
    const resp = await http.get(`${courseApi}/question/${questionId}`);
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
  content?: string,
  submissionId?: number
) => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    const resp = await http.post(`${courseApi}/question/${questionId}`, {
      userId: user?.user?.FEID,
      content,
      submissionId,
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
    const resp = await http.get(
      `${courseApi}/question/${questionId}/submissions`
    );
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const postSubmissionComment = async (
  comment?: string,
  questionId?: string,
  submissionId?: number
) => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    const resp = await http.post(
      `${courseApi}/question/${questionId}/submission/${submissionId}/comment`,
      {
        userId: user?.user?.FEID,
        comment,
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
export {
  getCampuses,
  getCourseDetail,
  getCourseMeeting,
  getCourses,
  getQuestionDetail,
  getQuestionSubmission,
  getUserById,
  login,
  postQuestionSubmission,
  postSubmissionComment,
};
