const { Router } = require("express");
const homeRouter = Router();
const homeController = require("../controllers/homeController");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../validators/authenticate");

homeRouter.get("/home/:FEID", authenticateToken, homeController.viewCourses);

module.exports = homeRouter;
