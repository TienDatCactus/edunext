import { error } from "console";
import { title } from "process";
export interface CourseSlice {
  error?: string;
  loading?: boolean;
  courses?: Array<{
    courseName: string;
    description?: string;
    courseCode: string;
    assignments?: Array<any>;
    instructor?: any;
    semester?: any;
    lessons?: Array<any>;
    status?: "active" | "inactive" | "archived";
    forMajor: string;
  }>;
  getCurrentCourses: () => void;
}

export interface LessonDetailProps {
  title?: string;
  deadline?: string;
  content?: string;
  lessonId?: number;
  questions?: Question[];
  tag?: string;
}
export interface ErrorHandlerOptions {
  redirectOnUnauthorized?: boolean;
  loginRedirectPath?: string;
  defaultSystemErrorMessage?: string;
  logger?: (message: string, error?: any) => void;
}

export interface CourseBriefInfo {
  id?: number;
  name?: string;
  code?: string;
  degree_level?: string;
  time_allocation?: string;
  pre_requisite?: string;
  description?: string;
  student_task?: string;
  tools?: string;
  note?: string;
  avg_to_pass?: number;
}

export interface CourseModalProps {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen?: boolean;
}
export interface CourseItem {
  _id?: string;
  courseCode?: string;
  instructor?: string;
  courseName?: string;
  description?: string;
  assignments?: string[];
  lessons?: LessonItem[];
  status?: string;
  meetings?: Array<{
    _id?: string;
    type: string;
    link?: string;
  }>;
  forMajor?: string;
}
export interface CourseLayoutProps {
  id?: number;
  code?: string;
  name?: string;
  instructor?: string;
}
export interface ExternalCourseState {
  coursera?: Array<{
    id: string;
    name: string;
    description: string;
    photoUrl: string;
    language: string;
    domainTypes: Array<{
      domainId: string;
      subdomainId: string;
    }>;
    workload: string;
    previewLink: string;
  }>;
  loading: boolean;
  error: string | null;
  fetchCourseraCourses: (keyword: string) => Promise<void>;
}
export interface CourseState {
  courses: CourseItem[];
  detail: CourseItem;
  selectedCourse: CourseItem | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCourses: () => Promise<void>;
  fetchCourseById: (courseCode: string) => Promise<void>;
  createCourse: (
    course: Omit<CourseItem, "_id" | "cwreatedAt" | "updatedAt" | "__v">
  ) => Promise<void>;
  updateCourse: (id: string, updatedData: Partial<CourseItem>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}
export interface QuestionState {
  question: Question;
  selectedQuestion: Question | null;
  loading: boolean;
  error: string | null;

  fetchQuestionById: (questionId: string) => Promise<void>;
  createQuestion: (
    question: Omit<Question, "_id" | "createdAt" | "updatedAt" | "__v">
  ) => Promise<void>;
  updateQuestion: (id: string, updatedData: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
}
export interface UserState {
  user?: User;
  getKeyword?: (user: User) => string;
  setUser: (user: User) => void;
}
export interface LessonItem {
  title?: string;
  content?: string;
  deadline?: string;
  course?: string;
  tag?: string;
  lessonGroups?: string[];
  question?: Question[];
}
export interface Question {
  _id?: string;
  content?:
    | string
    | {
        title?: string;
        answer?: string[];
        correctAnswer?: number;
      };
  lessonId?: number;
  status?: boolean;
  createdAt?: string;
  type?: "quiz" | "code" | "response";
}
export interface CourseInfoProps {
  meetings?: {
    courseId?: number;
    meetingLink?: string;
    meetingType?: string;
  }[];
  courseCode?: string;
  courseName?: string;
  description?: string;
  lessons?: {
    content?: string;
    courseId?: number;
    deadline?: string;
    lessonId?: number;
    tag?: string;
    title?: string;
    questions?: Question[];
  }[];
  question?: Question[];
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  user?: User;
}
export interface TimelineEvent {
  time: {
    day: string;
    month: string;
    year: string;
  };
  content: string;
  type: string;
}
export interface User {
  name: string;
  email: string;
  FEID: string;
  _id: string;
  role: string;
  timetable: TimelineEvent[];
}
export interface SubmissionItem {
  _id: string;
  content: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
  };
  comments?: {
    _id: string;
    content: string;
    createdAt: string;
    user: {
      _id: string;
      name: string;
    };
  }[];
  setAllSubmissions: React.Dispatch<React.SetStateAction<SubmissionItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ItemTypes = {
  KNIGHT: "knight",
};

export interface DASHBOARD_KEY_PROPS {
  landing?: {
    path: string | URL;
    key: string;
  };
  timetable?: {
    path: string | URL;
    key: string;
  };
  account?: {
    path: string | URL;
    key: string;
  };
  courses?: {
    path: string | URL;
    key: string;
  };
  lessons?: {
    path: string | URL;
    key: string;
  };
  classes?: {
    path: string | URL;
    key: string;
  };
}
