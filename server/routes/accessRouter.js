const express = require("express");
const passport = require("passport");
const accessRouter = express.Router();
const accessController = require("../controllers/accessController");
const {
  authenticateGoogle,
  googleCallback,
} = require("../validators/passport");
const jwt = require("jsonwebtoken");

accessRouter.get("/campuses", accessController.getCampuses);
accessRouter.post("/login", accessController.loginControl);
accessRouter.post("/logout", accessController.logoutControl);

accessRouter.get("/google", authenticateGoogle);

accessRouter.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return res.send(`
        <script>
          window.opener.postMessage({
            isOk: false,
            error: "Internal server error",
            details: "${err.message}"
          }, "*");
          window.close();
        </script>
      `);
      }

      if (!user) {
        return res.send(`
        <script>
          window.opener.postMessage({
            isOk: false,
            error: "${info?.message || "Authentication failed"}",
            errorCode: "${info?.errorCode || "AUTH_FAILED"}",
            details: "${info?.details || null}"
          }, "*");
          window.close();
        </script>
      `);
      }
      try {
        req.body = user;
        const loginResponse = await new Promise((resolve) => {
          accessController.loginControl(req, {
            json: (data) => resolve(data),
          });
        });

        const loginResponseJSON = JSON.stringify(loginResponse);
        if (loginResponse.isOk) {
          return res.send(`
        <script>
          window.opener.postMessage(${loginResponseJSON}, "*");
          window.close();
        </script>
      `);
        }
      } catch (error) {
        return res.send(`
        <script>
          window.opener.postMessage({
            isOk: false,
            error: "Login failed",
            details: "${error.message}"
          }, "*");
          window.close();
        </script>
      `);
      }
    }
  )(req, res, next);
});

accessRouter.post('/register/student', accessController.registerStudent);
accessRouter.post('/register/teacher', accessController.registerTeacher);

module.exports = accessRouter;
