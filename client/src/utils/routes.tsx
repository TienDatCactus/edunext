import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { getCurrentSeason } from "./customHooks";
import ExternalCourses from "../pages/course/externals/ExternalCourses";
import CourseList from "../pages/dashboards/admin/CourseList";
import path from "path";
import ProtectedRoute from "../ui/errors/ProtectRoute";
import { useUserStore } from "./zustand/Store";
import StudentList from "../pages/dashboards/admin/StudentList";

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
const AppRouter = () => {
  const { user } = useUserStore();
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
      element: user ? (
        <ProtectedRoute user={user} allowedRoles={[1, 2]} />
      ) : (
        <NotFound />
      ),
      children: [{ path: "", element: <ExternalCourses /> }],
    },
    {
      path: `/home/${year}/${month}`,
      errorElement: <NotFound />,
      element: <HomePage />,
    },
    {
      path: "/course",
      element: user ? (
        <ProtectedRoute user={user} allowedRoles={[1, 2]} />
      ) : (
        <NotFound />
      ),
      children: [
        {
          path: ":courseCode",
          children: [
            {
              path: "lesson/question",
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
      element: user ? (
        <ProtectedRoute user={user} allowedRoles={[1, 2, 3]} />
      ) : (
        <NotFound />
      ),
      children: [
        {
          path: "",
          element: (
            <Navigate
              to={
                user && Number(user.role) === 3
                  ? "/admin/course"
                  : "/dashboard/landing"
              }
              replace
            />
          ),
        },
        {
          path: "landing",
          element: user ? (
            <ProtectedRoute user={user} allowedRoles={[1, 2]} />
          ) : (
            <NotFound />
          ),
          children: [{ path: "", element: <Landing /> }],
          errorElement: <NotFound />,
        },
        {
          path: "account",
          element: user ? (
            <ProtectedRoute user={user} allowedRoles={[1, 2]} />
          ) : (
            <NotFound />
          ),
          children: [{ path: "", element: <Account /> }],
          errorElement: <NotFound />,
        },
        {
          path: "timetable",
          element: user ? (
            <ProtectedRoute user={user} allowedRoles={[1, 2]} />
          ) : (
            <NotFound />
          ),
          children: [{ path: "", element: <Timetable /> }],
          errorElement: <NotFound />,
        },
        {
          path: "courses",
          element: user ? (
            <ProtectedRoute user={user} allowedRoles={[2]} />
          ) : (
            <NotFound />
          ),
          children: [{ path: "", element: <CoursesByTeacher /> }],
          errorElement: <NotFound />,
        },
        {
          path: "lessons",
          element: user ? (
            <ProtectedRoute user={user} allowedRoles={[2]} />
          ) : (
            <NotFound />
          ),
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
          path: "students",
        },
      ],
      errorElement: <NotFound />,
    },
    {
      path: "admin",
      element: user ? (
        <ProtectedRoute user={user} allowedRoles={[3]} />
      ) : (
        <NotFound />
      ),
      children: [
        {
          path: "course",
          element: <CourseList />,
        },
        {
          path: "students",
          element: <StudentList />,
        },
        {
          path: "teachers",
          // element: <CourseList />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
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
    admin: {
      course: {
        path: "/admin/course",
        key: "19",
      },
      students: {
        path: "/admin/students",
        key: "20",
      },
      teachers: {
        path: "/admin/teachers",
        key: "21",
      },
    },
  },
};

export { ROUTE_KEYS };
