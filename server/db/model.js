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
    name: { type: String, required: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
    FEID: { type: String, required: true, unique: true, index: true },
    comments: [{ type: Schema.Types.Mixed, ref: "Comment" }],
    courses: [{ type: Schema.Types.Mixed, ref: "Course" }],
    submissions: [{ type: Schema.Types.Mixed, ref: "Submission" }],
    timetable: [{ type: Schema.Types.Mixed, ref: "Timetable" }],
    campus: { type: Schema.Types.Mixed, ref: "Campus" },
    courseClass: { type: Schema.Types.Mixed, ref: "CourseClass" },
    role: { type: Schema.Types.Mixed, ref: "Role" },
  },
  commonOptions
);

// Role Schema - Optimized
const RoleSchema = new Schema(
  {
    roleName: { type: String, required: true, unique: true, index: true },
    users: [{ type: Schema.Types.Mixed, ref: "User" }],
  },
  commonOptions
);

// Campus Schema - Optimized
const CampusSchema = new Schema(
  {
    campusName: { type: String, required: true, unique: true, index: true },
    users: [{ type: Schema.Types.Mixed, ref: "User" }],
  },
  commonOptions
);

// Semester Schema - Optimized
const SemesterSchema = new Schema(
  {
    semesterName: { type: String, required: true, index: true },
    year: { type: String, required: true, index: true },
    courses: [{ type: Schema.Types.Mixed, ref: "Course" }],
  },
  commonOptions
);

// Course Schema - Optimized
const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true, index: true },
    description: { type: String },
    courseCode: { type: String, required: true, unique: true, index: true },
    assignments: [{ type: Schema.Types.Mixed, ref: "Assignment" }],
    instructor: { type: Schema.Types.Mixed, ref: "User", index: true },
    semester: { type: Schema.Types.Mixed, ref: "Semester", index: true },
    lessons: [{ type: Schema.Types.Mixed, ref: "Lesson" }],
    meetings: [{ type: Schema.Types.Mixed, ref: "Meeting" }],
    timetables: [{ type: Schema.Types.Mixed, ref: "Timetable" }],
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
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
    meetingType: {
      type: String,
      required: true,
      enum: ["lecture", "lab", "tutorial", "other"],
    },
    meetingLink: { type: String, required: true },
    course: { type: Schema.Types.Mixed, ref: "Course" },
  },
  commonOptions
);

// Lesson Schema - Optimized
const LessonSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    content: { type: String },
    deadline: { type: Date, index: true },
    course: { type: Schema.Types.Mixed, ref: "Course", index: true },
    tag: { type: Schema.Types.Mixed, ref: "Tag" },
    lessonGroups: [{ type: Schema.Types.Mixed, ref: "LessonGroup" }],
    questions: [{ type: Schema.Types.Mixed, ref: "Question" }],
  },
  commonOptions
);

// LessonGroup Schema - Optimized
const LessonGroupSchema = new Schema(
  {
    userId: [{ type: Schema.Types.Mixed, ref: "User", index: true }],
    lesson: { type: Schema.Types.Mixed, ref: "Lesson", index: true },
  },
  commonOptions
);

// Question Schema - Optimized
const QuestionSchema = new Schema(
  {
    content: { type: String, required: true },
    status: { type: Boolean, default: false, index: true },
    course: { type: Schema.Types.Mixed, ref: "Course", index: true },
    lesson: { type: Schema.Types.Mixed, ref: "Lesson", index: true },
    submissions: [{ type: Schema.Types.Mixed, ref: "Submission" }],
  },
  commonOptions
);

// Tag Schema - Optimized
const TagSchema = new Schema(
  {
    tagId: { type: String, required: true, unique: true, index: true },
    tagName: { type: String, required: true, index: true },
    lessons: [{ type: Schema.Types.Mixed, ref: "Lesson" }],
  },
  commonOptions
);

// Assignment Schema - Optimized
const AssignmentSchema = new Schema(
  {
    assignmentId: { type: String, required: true, unique: true, index: true },
    courseId: {
      type: Schema.Types.Mixed,
      ref: "Course",
      required: true,
      index: true,
    },
    title: { type: String, required: true, index: true },
    description: { type: String },
    startDate: { type: Date, index: true },
    dueDate: { type: Date, index: true },
    course: { type: Schema.Types.Mixed, ref: "Course" },
  },
  commonOptions
);

// Submission Schema - Optimized
const SubmissionSchema = new Schema(
  {
    submissionContent: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now, index: true },
    comments: [{ type: Schema.Types.Mixed, ref: "Comment" }],
    question: { type: Schema.Types.Mixed, ref: "Question", index: true },
    user: { type: Schema.Types.Mixed, ref: "User", index: true },
  },
  commonOptions
);

// CourseClass Schema - Optimized
const CourseClassSchema = new Schema(
  {
    className: { type: String, required: true, index: true },
    students: [{ type: Schema.Types.Mixed, ref: "User" }],
  },
  commonOptions
);

// Timetable Schema - Optimized
const TimetableSchema = new Schema(
  {
    time: { type: Date, required: true, index: true },
    course: { type: Schema.Types.Mixed, ref: "Course", index: true },
    user: { type: Schema.Types.Mixed, ref: "User", index: true },
  },
  commonOptions
);

// Comment Schema - Optimized
const CommentSchema = new Schema(
  {
    commentContent: { type: String, required: true },
    commentDate: { type: Date, default: Date.now, index: true },
    submission: { type: Schema.Types.Mixed, ref: "Submission", index: true },
    user: { type: Schema.Types.Mixed, ref: "User", index: true },
  },
  commonOptions
);

// Export models
module.exports = {
  User: mongoose.model("User", UserSchema),
  Role: mongoose.model("Role", RoleSchema),
  Campus: mongoose.model("Campus", CampusSchema),
  Semester: mongoose.model("Semester", SemesterSchema),
  Course: mongoose.model("Course", CourseSchema),
  Meeting: mongoose.model("Meeting", MeetingSchema),
  Lesson: mongoose.model("Lesson", LessonSchema),
  LessonGroup: mongoose.model("LessonGroup", LessonGroupSchema),
  Question: mongoose.model("Question", QuestionSchema),
  Tag: mongoose.model("Tag", TagSchema),
  Assignment: mongoose.model("Assignment", AssignmentSchema),
  Submission: mongoose.model("Submission", SubmissionSchema),
  CourseClass: mongoose.model("CourseClass", CourseClassSchema),
  Timetable: mongoose.model("Timetable", TimetableSchema),
  Comment: mongoose.model("Comment", CommentSchema),
};
