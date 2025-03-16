import { create } from "zustand";
import {
  CodeState,
  CourseState,
  ExternalCourseState,
  QuestionState,
  User,
  UserState,
  UserToken,
} from "../interfaces";
import {
  getCourseDetail,
  getCourses,
  getQuestionDetail,
  submitCode,
} from "../api";
import { executeCode, getCourseraCourses } from "../api/externals";
import { message } from "antd";

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  detail: {},
  selectedCourse: null,
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await getCourses();
      if (resp?.isOk) {
        set({ courses: resp.courses });
      }
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch courses" });
    } finally {
      set({ loading: false });
    }
  },

  fetchCourseById: async (courseCode) => {
    set({ loading: true, error: null });
    try {
      const resp = await getCourseDetail(courseCode);
      if (resp?.isOk) {
        set({ detail: resp.course });
      }
    } catch (error) {
      console.error(error);
      set({ error: `Failed to fetch course with code ${courseCode}` });
    } finally {
      set({ loading: false });
    }
  },

  createCourse: async (course) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      if (!response.ok) throw new Error("Failed to create course");

      const newCourse = await response.json();
      set((state) => ({
        courses: [...state.courses, newCourse],
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error: "Failed to create course", loading: false });
    }
  },

  updateCourse: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update course");

      const updatedCourse = await response.json();
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === id ? updatedCourse : course
        ),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error: `Failed to update course with id ${id}`, loading: false });
    }
  },

  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete course");

      set((state) => ({
        courses: state.courses.filter((course) => course._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error: `Failed to delete course with id ${id}`, loading: false });
    }
  },
}));

export const useQuestionStore = create<QuestionState>((set) => ({
  question: {},
  selectedQuestion: null,
  loading: false,
  error: null,

  fetchQuestionById: async (questionId) => {
    set({ loading: true, error: null });
    try {
      const resp = await getQuestionDetail(questionId);
      if (resp?.isOk) {
        set({ question: resp.question });
      }
    } catch (error) {
      console.error(error);
      set({ error: `Failed to fetch question with id ${questionId}` });
    } finally {
      set({ loading: false });
    }
  },

  createQuestion: async (question) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      });

      if (!response.ok) throw new Error("Failed to create question");

      await response.json();
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to create question", loading: false });
    }
  },

  updateQuestion: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update question");

      await response.json();
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ error: `Failed to update question`, loading: false });
    }
  },

  deleteQuestion: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete question");

      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ error: `Failed to delete question with id ${id}`, loading: false });
    }
  },
}));

export const useUserStore = create<UserState>((set) => ({
  user: (() => {
    try {
      const token = localStorage.getItem("edu-token");
      return token ? JSON.parse(token).user : undefined;
    } catch (error) {
      console.error("Error parsing user token:", error);
      return undefined;
    }
  })(),

  setUser: (user) => set({ user }),

  getKeyword: (user: User) => {
    if (!user?.FEID) return "unknown";

    const feid = user.FEID.toUpperCase();
    if (/^HE\d+/.test(feid)) return "programming";
    if (/^MC\d+/.test(feid)) return "marketing";
    if (/^GD\d+/.test(feid)) return "graphic design";
    if (/^MKT\d+/.test(feid)) return "marketing";

    return "unknown";
  },
}));

export const useExternalCourseStore = create<ExternalCourseState>((set) => ({
  coursera: [],
  loading: false,
  error: null,

  fetchCourseraCourses: async (keyword) => {
    set({ loading: true, error: null });
    try {
      const resp = await getCourseraCourses(keyword);
      if (resp?.isOk) {
        set({ coursera: resp.courses });
      }
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch external courses" });
    } finally {
      set({ loading: false });
    }
  },
}));

export const useCodeStore = create<CodeState>((set) => ({
  code: "",
  output: "",
  actualOutput: {},
  codeloading: false,
  lineCount: 1,

  setCode: (code: string) => set({ code }),

  handleEditorChange: (value: string) => {
    if (value) {
      const lines = value.split("\n").length;
      set({ lineCount: lines, code: value.trimEnd() });
    } else {
      set({ lineCount: 1 });
    }
  },

  runCode: async (code: string) => {
    set({ codeloading: true });
    try {
      const resp = await executeCode(code);
      if (resp) set({ output: resp || "No output" });
    } catch (error) {
      console.error(error);
    } finally {
      set({ codeloading: false });
    }
  },

  handleSubmitCode: async (code: string, qId: string) => {
    if (!qId) return message.error("Vui lòng nhập code trước khi gửi");

    set({ codeloading: true });
    try {
      const resp = await submitCode(code, qId);
      if (resp?.isOk) {
        set({ actualOutput: resp?.result });
        return message.success("Gửi bài thành công");
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ codeloading: false });
    }
  },
}));
