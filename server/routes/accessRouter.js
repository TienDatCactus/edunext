const { Router } = require("express");
const accessRouter = Router();
const accessController = require("../controllers/accessController");
const passportConfig = require("../validators/passport");
const jwt = require("jsonwebtoken");

accessRouter.post("/login", accessController.loginControl);
accessRouter.get("/login/google", passportConfig.authenticateGoogle);
accessRouter.get(
  "/google/callback",
  passportConfig.googleCallback,
  (req, res) => {
    // Create JWT token after successful Google login
    const token = jwt.sign(
      { id: req.user.id },
      passportConfig.config.jwt.secret,
      { expiresIn: passportConfig.config.jwt.expiresIn }
    );
    res.json({ token });
  }
);

module.exports = accessRouter;
