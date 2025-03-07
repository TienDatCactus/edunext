const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passportConfig = require("./validators/passport");
const passport = require("passport");
const accessRouter = require("./routes/accessRouter");
const homeRouter = require("./routes/homeRouter");
const courseRouter = require("./routes/courseRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const lessonRouter = require("./routes/lessonRouter");


const connectDB = require("./db/connect");
const mongoose = require("mongoose");
const questionRouter = require("./routes/questionRouter");
require("dotenv").config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportConfig.initialize();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/auth", accessRouter);
app.use("/", homeRouter);
app.use("/course", courseRouter);
app.use("/dashboard", dashboardRouter);
app.use("/question", questionRouter);
app.use("/lesson", lessonRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
