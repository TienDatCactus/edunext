const { Router } = require("express");
const dashboardRouter = Router();
const dashboardController = require("../controllers/dashboardController");
const passportConfig = require("../validators/passport");
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
module.exports = dashboardRouter;
