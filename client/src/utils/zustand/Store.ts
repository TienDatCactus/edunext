import { create } from "zustand";
import {
  CourseState,
  QuestionState,
  UserState,
  UserToken,
} from "../interfaces";
import { getCourseDetail, getCourses, getQuestionDetail } from "../api";

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  detail: {},
  selectedCourse: null,
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await getCourses(); // Replace with your API endpoint
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

export const useQuestionStore = create<QuestionState>((set, get) => ({
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

export const useUserStore = create<UserState>((set, get) => ({
  user: (() => {
    const token = localStorage.getItem("edu-token");
    return token ? (JSON.parse(token) as UserToken)?.user : undefined;
  })(),
  setUser: (user) => {
    set({ user });
  },
}));
