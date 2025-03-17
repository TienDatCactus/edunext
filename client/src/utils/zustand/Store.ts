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
      if (!!resp && resp?.isOk === true) set({ courses: resp?.courses });
    } catch (error) {
      set({ error: "Failed to fetch courses" });
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Fetch a single course by ID
  fetchCourseById: async (courseCode) => {
    set({ loading: true, error: null });
    try {
      const resp = await getCourseDetail(courseCode);
      if (!!resp && resp?.isOk === true) set({ detail: resp?.course });
    } catch (error) {
      set({
        error: `Failed to fetch course with code ${courseCode}`,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Create a new course
  createCourse: async (course) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const newCourse = await response.json();
      set((state) => ({
        courses: [...state.courses, newCourse],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create course", loading: false });
    }
  },

  // Update an existing course
  updateCourse: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const updatedCourse = await response.json();
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === id ? updatedCourse : course
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: `Failed to update course with id ${id}`, loading: false });
    }
  },

  // Delete a course
  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        courses: state.courses.filter((course) => course._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: `Failed to delete course with id ${id}`, loading: false });
    }
  },
}));

export const useQuestionStore = create<QuestionState>((set) => ({
  question: {},
  selectedQuestion: null,
  loading: false,
  error: null,

  // Fetch a single question by ID
  fetchQuestionById: async (questionId) => {
    set({ loading: true, error: null });
    try {
      const resp = await getQuestionDetail(questionId);
      if (!!resp && resp?.isOk === true) set({ question: resp?.question });
    } catch (error) {
      set({
        error: `Failed to fetch question with id ${questionId}`,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Create a new question
  createQuestion: async (question) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      const newQuestion = await response.json();
      set((state) => ({
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create question", loading: false });
    }
  },

  // Update an existing question
  updateQuestion: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const updatedQuestion = await response.json();
    } catch (error) {
      set({
        error: `Failed to update question`,
      });
    }
  },
  deleteQuestion: async (id) => {},
}));

export const useUserStore = create<UserState>((set) => ({
  user: (() => {
    const token = localStorage.getItem("edu-token");
    return token ? (JSON.parse(token) as UserToken)?.user : undefined;
  })(),
  setUser: (user) => {
    set({ user });
  },
  getKeyword: (user: User) => {
    switch (true) {
      case /^HE[0-9]+/i.test(user?.FEID):
        return "programming";
      case /^MC[0-9]+/i.test(user?.FEID):
        return "marketing";
      case /^GD[0-9]+/i.test(user?.FEID):
        return "graphic design";
      case /^MKT[0-9]+/i.test(user?.FEID):
        return "marketing";
      default:
        return "unknown";
    }
  },
}));

export const useExternalCourseStore = create<ExternalCourseState>((set) => ({
  coursera: [],
  loading: false,
  error: null,

    fetchCourseraCourses: async (keyword) => {
      try {
        set({ loading: true, error: null });
        const resp = await getCourseraCourses(keyword);
        if (resp?.isOk === true) set({ coursera: resp?.courses });
      } catch (error) {
        set({ error: "Failed to fetch courses" });
      } finally {
        set({ loading: false });
      }
    },
  })
);

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
