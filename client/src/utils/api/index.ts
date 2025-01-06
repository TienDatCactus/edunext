import { getCurrentSeason } from "../customHooks";
import { UserToken } from "../interfaces";
import http from "./axios";
import { courseApi, homeApi, loginApi } from "./urls";
const login = async (campus: string, email: string, password: string) => {
  try {
    const resp = await http.post(`${loginApi}`, {
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
    const year = new Date().getFullYear();
    const month = getCurrentSeason();
    const resp = await http.get(`${homeApi}/${year}/${month}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getCourseDetail = async (id: number) => {
  try {
    const resp = await http.get(`${courseApi}/${id}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getQuestionDetail = async (questionId: number) => {
  try {
    const resp = await http.get(`${courseApi}/question/${questionId}`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getCourseMeeting = async (courseId: number) => {
  try {
    const resp = await http.get(`${courseApi}/${courseId}/meetings`);
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
const postQuestionSubmission = async (
  questionId?: number,
  content?: string
) => {
  try {
    const tokenString = localStorage.getItem("edu-token");
    const user = tokenString ? (JSON.parse(tokenString) as UserToken) : null;
    const resp = await http.post(`${courseApi}/question/${questionId}`, {
      userId: user?.user?.userId,
      content,
    });
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};

const getQuestionSubmission = async (questionId?: number) => {
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
        userId: user?.user?.userId,
        comment,
      }
    );
    if (resp?.data) return resp?.data;
    return null;
  } catch (error) {
    return error;
  }
};
export {
  getCourseDetail,
  getCourseMeeting,
  getCourses,
  getQuestionDetail,
  getQuestionSubmission,
  login,
  postQuestionSubmission,
  postSubmissionComment,
};
