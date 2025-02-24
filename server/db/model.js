const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common options for all schemas
const commonOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true, // Adds createdAt and updatedAt
};

// User Schema - Optimized
const UserSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, index: true },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: Schema.Types.String, required: true, select: false },
    FEID: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    timetable: [{ type: Schema.Types.Mixed, ref: "Timetable" }],
    campus: { type: Schema.Types.Mixed, ref: "Campus" },
    courseClass: { type: Schema.Types.Mixed, ref: "CourseClass" },
    role: { type: Schema.Types.Mixed, ref: "Role" },
    major: { type: Schema.Types.Mixed },
    semester: { type: Schema.Types.Mixed, ref: "Semester" },
  },
  commonOptions
);

// Campus Schema - Optimized
const CampusSchema = new Schema(
  {
    campusName: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
  },
  commonOptions
);

// Semester Schema - Optimized
const SemesterSchema = new Schema(
  {
    semesterName: { type: Schema.Types.String, required: true, index: true },
    year: { type: Schema.Types.String, required: true, index: true },
    courses: [{ type: Schema.Types.Mixed, ref: "Course" }],
  },
  commonOptions
);

// Course Schema - Optimized
const CourseSchema = new Schema(
  {
    courseName: { type: Schema.Types.String, required: true, index: true },
    description: { type: Schema.Types.String },
    courseCode: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    assignments: [{ type: Schema.Types.Mixed, ref: "Assignment" }],
    instructor: { type: Schema.Types.Mixed, ref: "User", index: true },
    semester: { type: Schema.Types.Mixed, ref: "Semester", index: true },
    lessons: [{ type: Schema.Types.Mixed, ref: "Lesson" }],
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
      index: true,
    },
    forMajor: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
  },
  commonOptions
);

// Meeting Schema - Optimized
const MeetingSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.Mixed,
      ref: "Course",
      required: true,
      index: true,
    },
    meetings: [
      {
        type: {
          type: Schema.Types.String,
          required: true,
          enum: ["Google Meet", "Discord", "Zoom", "Teams"],
        },
        link: {
          type: Schema.Types.String,
          required: true,
        },
      },
    ],
  },
  commonOptions
);

// Lesson Schema - Optimized
const LessonSchema = new Schema(
  {
    title: { type: Schema.Types.String, required: true, index: true },
    content: { type: Schema.Types.String },
    deadline: { type: Schema.Types.Date, index: true },
    course: { type: Schema.Types.Mixed, ref: "Course", index: true },
    tag: { type: Schema.Types.Mixed },
  },
  commonOptions
);

// LessonGroup Schema - Optimized
const LessonGroupSchema = new Schema(
  {
    userId: [{ type: Schema.Types.Mixed, ref: "User", index: true }],
    course: { type: Schema.Types.Mixed, ref: "Course", index: true },
    team: String
  },
  commonOptions
);

// Question Schema - Optimized
const QuestionSchema = new Schema(
  {
    content: { type: Schema.Types.Mixed, required: true },
    status: { type: Schema.Types.Boolean, default: false, index: true },
    lesson: { type: Schema.Types.Mixed, ref: "Lesson", index: true },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: ["quiz", "code", "response"],
    },
  },
  commonOptions
);

// Assignment Schema - Optimized
const AssignmentSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.Mixed,
      ref: "Course",
      required: true,
      index: true,
    },
    title: { type: Schema.Types.String, required: true, index: true },
    description: { type: Schema.Types.String },
    startDate: { type: Schema.Types.Date, index: true },
    dueDate: { type: Schema.Types.Date, index: true },
    courseId: { type: Schema.Types.Mixed, ref: "Course" },
  },
  commonOptions
);

// Submission Schema - Optimized
const SubmissionSchema = new Schema(
  {
    content: { type: Schema.Types.String, required: true },
    question: { type: Schema.Types.Mixed, ref: "Question", index: true },
    user: { type: Schema.Types.Mixed, ref: "User", index: true },
  },
  commonOptions
);

// CourseClass Schema - Optimized
const CourseClassSchema = new Schema(
  {
    className: { type: Schema.Types.String, required: true, index: true },
    students: [{ type: Schema.Types.Mixed, ref: "User" }],
  },
  commonOptions
);

// Timetable Schema - Optimized
const TimetableSchema = new Schema(
  {
    user: { type: Schema.Types.Mixed, ref: "User", index: true },
    timeline: {
      type: Schema.Types.Mixed,
      required: true,
      
    },
  
  },
  commonOptions
);

// Comment Schema - Optimized
const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    submission: { type: Schema.Types.Mixed, ref: "Submission", index: true },
    user: { type: Schema.Types.Mixed, ref: "User", index: true },
  },
  commonOptions
);

// Export models
module.exports = {
  User: mongoose.model("User", UserSchema),
  Campus: mongoose.model("Campus", CampusSchema),
  Semester: mongoose.model("Semester", SemesterSchema),
  Course: mongoose.model("Course", CourseSchema),
  Meeting: mongoose.model("Meeting", MeetingSchema),
  Lesson: mongoose.model("Lesson", LessonSchema),
  LessonGroup: mongoose.model("LessonGroup", LessonGroupSchema),
  Question: mongoose.model("Question", QuestionSchema),
  Assignment: mongoose.model("Assignment", AssignmentSchema),
  Submission: mongoose.model("Submission", SubmissionSchema),
  CourseClass: mongoose.model("CourseClass", CourseClassSchema),
  Timetable: mongoose.model("Timetable", TimetableSchema),
  Comment: mongoose.model("Comment", CommentSchema),
};
