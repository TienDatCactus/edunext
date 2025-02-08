const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passportConfig = require("./validators/passport");
const passport = require("passport");
const accessRouter = require("./routes/accessRouter");
const homeRouter = require("./routes/homeRouter");
const courseRouter = require("./routes/courseRouter");
const connectDB = require("./db/connect");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportConfig.initialize();

app.use("/auth", accessRouter);
app.use("/", homeRouter);
app.use("/course", courseRouter);
const PORT = process.env.PORT;
app.use("/articles", (req, res) => {
  res.send({
    title: "Hello World",
    describe: "This is a description",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
