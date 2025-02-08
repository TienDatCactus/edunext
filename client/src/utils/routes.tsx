import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AddQuestion from "../pages/dashboards/teacher/AddQuestion";
import Landing from "../pages/dashboards/teacher/Landing";
import Account from "../pages/dashboards/user/sub_pages/Account";
import Timetable from "../pages/dashboards/user/sub_pages/Timetable";
import { getCurrentSeason } from "./customHooks";

const LoginPage = lazy(() => import("../pages/access/LoginPage"));
const Detail = lazy(() => import("../pages/course/detail/Detail"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const HomePage = lazy(() => import("../pages/course/home/HomePage"));
const Question = lazy(() => import("../pages/course/question/Question"));
const NotFound = lazy(() => import("../ui/errors/ErrorBoundary"));

const year = new Date().getFullYear().toString();
const month = getCurrentSeason();
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <LandingPage />,
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
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "timetable",
        element: <Timetable />,
      },

      {
        path: "question",
        children: [
          {
            path: "add",
            element: <AddQuestion />,
          },
        ],
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
      question: {
        path: "/dashboard/question/add",
        key: "15",
      },
    },
  },
};

export { ROUTE_KEYS };
