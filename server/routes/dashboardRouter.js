const { Router } = require("express");
const dashboardRouter = Router();
const dashboardController = require("../controllers/dashboardController");
const passportConfig = require("../validators/passport");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../validators/authenticate");

dashboardRouter.post(
  "/timetable",
  
  dashboardController.addNewTimeTable
);

module.exports = dashboardRouter;
