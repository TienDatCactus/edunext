const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User, Semester, Course, Lesson, Assignment } = require("./model");
const {
  mockCourses,
  mockSemesters,
  mockInstructors,
  mockLessons,
  mockAssignments,
} = require("./mockData");
const connectDB = require("./connect");
async function seed() {
  try {
    // Connect to MongoDB
    connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Semester.deleteMany({}),
      Course.deleteMany({}),
      Lesson.deleteMany({}),
      Assignment.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create instructors
    const instructors = await Promise.all(
      mockInstructors.map(async (instructor) => {
        const hashedPassword = await bcrypt.hash("password123", 10);
        return new User({
          ...instructor,
          password: hashedPassword,
        }).save();
      })
    );
    console.log("Created instructors");

    // Create semesters
    const semesters = await Promise.all(
      mockSemesters.map((semester) => new Semester(semester).save())
    );
    console.log("Created semesters");

    // Create courses with references
    const courses = await Promise.all(
      mockCourses.map(async (course) => {
        const instructor = instructors.find(
          (i) => i.FEID === course.instructor
        );
        const semester = semesters.find((s) =>
          s.semesterName.startsWith(course.semester)
        );

        return new Course({
          ...course,
          instructor: instructor._id,
          semester: semester._id,
        }).save();
      })
    );
    console.log("Created courses");

    // Update semester references
    await Promise.all(
      semesters.map((semester) => {
        const semesterCourses = courses
          .filter(
            (course) => course.semester.toString() === semester._id.toString()
          )
          .map((course) => course._id);

        return Semester.findByIdAndUpdate(
          semester._id,
          { $set: { courses: semesterCourses } },
          { new: true }
        );
      })
    );
    console.log("Updated semester references");

    // Create lessons with references
    const lessons = await Promise.all(
      mockLessons.map(async (lesson) => {
        const course = courses.find((c) => c.courseCode === lesson.course);
        return new Lesson({
          ...lesson,
          course: course._id,
        }).save();
      })
    );
    console.log("Created lessons");

    // Update course references with lessons
    await Promise.all(
      courses.map(async (course) => {
        const courseLessons = lessons
          .filter(
            (lesson) => lesson.course.toString() === course._id.toString()
          )
          .map((lesson) => lesson._id);

        return Course.findByIdAndUpdate(
          course._id,
          { $set: { lessons: courseLessons } },
          { new: true }
        );
      })
    );
    console.log("Updated course references with lessons");

    // Create assignments with references
    const assignments = await Promise.all(
      mockAssignments.map(async (assignment) => {
        const course = courses.find(
          (c) => c.courseCode === assignment.courseId
        );
        return new Assignment({
          ...assignment,
          courseId: course._id,
        }).save();
      })
    );
    console.log("Created assignments");

    // Update course references with assignments
    await Promise.all(
      courses.map(async (course) => {
        const courseAssignments = assignments
          .filter(
            (assignment) =>
              assignment.courseId.toString() === course._id.toString()
          )
          .map((assignment) => assignment._id);

        return Course.findByIdAndUpdate(
          course._id,
          { $set: { assignments: courseAssignments } },
          { new: true }
        );
      })
    );
    console.log("Updated course references with assignments");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
