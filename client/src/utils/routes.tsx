import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Account from "../pages/dashboards/user/sub_pages/Account";
import Timetable from "../pages/dashboards/user/sub_pages/Timetable";
import { getCurrentSeason } from "./customHooks";
import path from "path";
import Board from "../pages/chess/Board";
import AddQuestion from "../pages/dashboards/teacher/AddQuestion";

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
        path: "account",
        element: <Account />,
      },
      {
        path: "timetable",
        element: <Timetable />,
      },

      {
        path: "create-question",
        element: <AddQuestion />
      }

    ],
    errorElement: <NotFound />,
  },
]);

export default router;
const ROUTE_KEYS = {
  dashboard: {
    account: {
      path: "/dashboard/account",
      key: "13",
    },
    timetable: {
      path: "/dashboard/timetable",
      key: "14",
    },
  },
};

export { ROUTE_KEYS };
