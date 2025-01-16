export interface LessonDetailProps {
  title?: string;
  tagId?: number;
  deadline?: string;
  content?: string;
  lessonId?: number;
  questions?: Questions[];
  tagName: string;
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
  courseCode?: string;
  courseId?: number;
  courseName?: string;
  description?: string;
  endDate?: string;
  instructorId?: number;
  meetingId?: number[];
  semesterId?: number;
  startDate?: string;
}
export interface CourseLayoutProps {
  id?: number;
  code?: string;
  name?: string;
  instructor?: string;
}

export interface LessonItem {
  lessons: {
    content?: string;
    courseId?: number;
    deadline?: string;
    lessonId?: number;
    tagId?: number;
    title?: string;
    Question?: Questions[];
    Tag?: {
      tagName?: string;
      tagId?: number;
    };
  };
  questions: Questions[];
  tags: {
    tagName: string;
  };
}
export interface Questions {
  content?: string;
  courseId?: number;
  lessonId?: number;
  questionId?: number;
}

export interface CourseInfoProps {
  courseCode?: string;
  courseName?: string;
  description?: string;
  lessons?: {
    content?: string;
    courseId?: number;
    deadline?: string;
    lessonId?: number;
    tagId?: number;
    title?: string;
    Question?: Questions[];
    Tag?: {
      tagName?: string;
      tagId?: number;
    };
  }[];
  tagName: string;
  questions?: Questions[];
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  user?: User;
}
export interface User {
  userId: number;
  name: string;
  email: string;
  FEID: string;
  campusId: number;
  classId: number;
  roleId: number;
}
export interface SubmissionItem {
  submissionId: number;
  submissionContent: string;
  submissionDate: string;
  userId: number;
  comments?: {
    submissionId: number;
    commentId: number;
    commentContent: string;
    commentDate: string;
    user: {
      name: string;
      userId: number;
    };
  }[];
  setAllSubmissions: React.Dispatch<React.SetStateAction<SubmissionItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ItemTypes = {
  KNIGHT: "knight",
};
