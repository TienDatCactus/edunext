import React from "react";

export interface LessonDetailProps {
  title?: string;
  deadline?: string;
  content?: string;
  lessonId?: number;
  questions?: Questions[];
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
  courseCode?: string;
  courseName?: string;
  description?: string;
  endDate?: string;
  instructorId?: number;
  meetings?: {
    courseId?: number;
    meetingLink?: string;
    meetingType?: string;
  }[];
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
  title?: string;
  content?: string;
  courseId?: number;
  deadline?: string;
  tag?: string;
  Question?: Questions[];
}
export interface Questions {
  content?: string;
  courseId?: number;
  lessonId?: number;
  questionId?: number;
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
    questions?: Questions[];
  }[];
  questions?: Questions[];
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  user?: User;
}
export interface User {
  name: string;
  email: string;
  FEID: string;
  campusId: number;
  classId: number;
  roleId: number;
}
export interface SubmissionItem {
  _id: string;
  submissionContent: string;
  submissionDate: string;
  user: {
    _id: string;
    name: string;
  };
  comments?: {
    _id: string;
    commentId: number;
    commentContent: string;
    commentDate: string;
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
