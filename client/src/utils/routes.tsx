import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { getCurrentSeason } from "./customHooks";
import ExternalCourses from "../pages/course/externals/ExternalCourses";

const LoginPage = lazy(() => import("../pages/access/LoginPage"));
const Detail = lazy(() => import("../pages/course/detail/Detail"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const HomePage = lazy(() => import("../pages/course/home/HomePage"));
const Question = lazy(() => import("../pages/course/question/Question"));
const NotFound = lazy(() => import("../ui/errors/ErrorElement"));
const Landing = lazy(() => import("../pages/dashboards/teacher/Landing"));
const ErrorPage = lazy(() => import("../ui/errors/ErrorPage"));
const Timetable = lazy(
  () => import("../pages/dashboards/user/sub_pages/Timetable")
);
const Account = lazy(
  () => import("../pages/dashboards/user/sub_pages/Account")
);
const QuestionModify = lazy(
  () => import("../pages/dashboards/teacher/sub_pages/QuestionModify")
);
const LessonDetail = lazy(
  () => import("../pages/dashboards/teacher/sub_pages/QuestionList")
);
const LessonsByTeacher = lazy(
  () => import("../pages/dashboards/teacher/LessonsByTeacher")
);
const CoursesByTeacher = lazy(
  () => import("../pages/dashboards/teacher/CoursesByTeacher")
);
const ClassesByTeacher = lazy(
  () => import("../pages/dashboards/teacher/ClassesByTeacher")
);

const year = new Date().getFullYear().toString();
const month = getCurrentSeason();
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <LandingPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: `/externals`,
    errorElement: <NotFound />,
    element: <ExternalCourses />,
  },
  {
    path: `/home/${year}/${month}`,
    errorElement: <NotFound />,
    element: <HomePage />,
  },
  {
    path: "/course",
    children: [
      {
        path: ":courseCode",
        children: [
          {
            path: "lesson/:lessonId/question",
            element: <Question />,
          },
          {
            path: "detail",
            element: <Detail />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "landing",
        element: <Landing />,
        errorElement: <NotFound />,
      },
      {
        path: "account",
        element: <Account />,
        errorElement: <NotFound />,
      },
      {
        path: "timetable",
        element: <Timetable />,
        errorElement: <NotFound />,
      },
      {
        path: "courses",
        element: <CoursesByTeacher />,
        errorElement: <NotFound />,
      },
      {
        path: "lessons",
        children: [
          {
            path: "all",
            element: <LessonsByTeacher />,
          },
          {
            path: "detail",
            element: <LessonDetail />,
          },
          {
            path: "questions",
            children: [
              {
                path: "modify",
                element: <QuestionModify />,
              },
            ],
          },
        ],
        errorElement: <NotFound />,
      },
      {
        path: "classes",
        element: <ClassesByTeacher />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
const ROUTE_KEYS = {
  dashboard: {
    student: {
      account: {
        path: "/dashboard/account",
        key: "13",
      },
      timetable: {
        path: "/dashboard/timetable",
        key: "14",
      },
    },
    teacher: {
      landing: {
        path: "/dashboard/landing",
        key: "13",
      },
      timetable: {
        path: "/dashboard/timetable",
        key: "14",
      },
      account: {
        path: "/dashboard/account",
        key: "15",
      },
      courses: {
        path: "/dashboard/courses",
        key: "16",
      },
      lessons: {
        path: "/dashboard/lessons/all",
        key: "17",
        children: [
          {
            lessonDetail: {
              path: "/dashboard/lessons/detail",
              key: "17.1",
            },
          },
        ],
      },
      classes: {
        path: "/dashboard/classes",
        key: "18",
      },
    },
  },
};

export { ROUTE_KEYS };
