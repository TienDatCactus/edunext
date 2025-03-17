const { Router } = require("express");
const dashboardRouter = Router();
const dashboardController = require("../controllers/dashboardController");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../validators/authenticate");

dashboardRouter.post(
  "/timetable",
  authenticateToken,
  dashboardController.addNewTimeTable
);

dashboardRouter.get(
  "/timetable/:id",
  authenticateToken,
  dashboardController.getUserTimeTable
);

dashboardRouter.get("/assignment", dashboardController.getAllAssignment);

dashboardRouter.get("/users", dashboardController.getAllUsers);

dashboardRouter.get("/semester", dashboardController.getAllSemester);
module.exports = dashboardRouter;
