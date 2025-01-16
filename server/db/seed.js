const mongoose = require("mongoose");
const models = require("./model");
const { log } = require("console");
const connectDB = require("./connect");

async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all(
      Object.values(models).map((model) => model.deleteMany({}))
    );

    // Create Role
    const roleData = await models.Role.create({
      roleName: "Professor",
      users: [],
    });

    // Create Campus
    const campusData = await models.Campus.create({
      campusName: "Main Campus",
      users: [],
    });

    // Create CourseClass
    const courseClassData = await models.CourseClass.create({
      className: "CS-2024A",
      students: [],
    });

    // Create User
    const userData = await models.User.create({
      name: "Dr. John Smith",
      email: "john.smith@university.edu",
      password: "$2a$10$XYZ....", // This should be properly hashed
      FEID: "PROF001",
      comments: [],
      courses: [],
      submissions: [],
      timetable: [],
      campus: campusData, // Full campus object
      courseClass: courseClassData, // Full courseClass object
      role: roleData, // Full role object
    });

    // Update Role and Campus with full User object
    roleData.users.push(userData);
    await roleData.save();

    campusData.users.push(userData);
    await campusData.save();

    // Create Semester
    const semesterData = await models.Semester.create({
      semesterName: "Spring 2025",
      year: "2025",
      courses: [],
    });

    // Create Tag
    const tagData = await models.Tag.create({
      tagId: "TAG001",
      tagName: "Programming",
      lessons: [],
    });

    // Create Course
    const courseData = await models.Course.create({
      courseName: "Advanced Programming",
      description: "Advanced concepts in software development",
      courseCode: "CS401",
      assignments: [],
      instructor: userData, // Full user object
      semester: semesterData, // Full semester object
      lessons: [],
      meetings: [],
      questions: [],
      timetables: [],
      status: "active",
    });

    // Update Semester with full Course object
    semesterData.courses.push(courseData);
    await semesterData.save();

    // Create Meeting
    const meetingData = await models.Meeting.create({
      courseId: courseData._id,
      meetingType: "lecture",
      meetingLink: "https://university.zoom.us/j/123456789",
      course: courseData, // Full course object
    });

    // Create Lesson
    const lessonData = await models.Lesson.create({
      title: "Introduction to Design Patterns",
      content: "This lesson covers the fundamental design patterns...",
      deadline: new Date("2025-02-01"),
      course: courseData, // Full course object
      tag: tagData, // Full tag object
      lessonGroups: [],
      questions: [],
    });

    // Create LessonGroup
    const lessonGroupData = await models.LessonGroup.create({
      userId: [userData], // Array of full user objects
      lesson: lessonData, // Full lesson object
    });

    // Create Question
    const questionData = await models.Question.create({
      content: "Explain the Observer pattern and its use cases.",
      status: false,
      course: courseData, // Full course object
      lesson: lessonData, // Full lesson object
      submissions: [],
    });

    // Create Assignment
    const assignmentData = await models.Assignment.create({
      assignmentId: "ASG001",
      courseId: courseData._id,
      title: "Design Patterns Implementation",
      description: "Implement three design patterns of your choice...",
      startDate: new Date("2025-01-15"),
      dueDate: new Date("2025-01-30"),
      course: courseData, // Full course object
    });

    // Create Submission
    const submissionData = await models.Submission.create({
      submissionContent: "Here's my implementation of the Observer pattern...",
      submissionDate: new Date("2025-01-28"),
      comments: [],
      question: questionData, // Full question object
      user: userData, // Full user object
    });

    // Create Timetable
    const timetableData = await models.Timetable.create({
      time: new Date("2025-01-15T10:00:00Z"),
      course: courseData, // Full course object
      user: userData, // Full user object
    });

    // Create Comment
    const commentData = await models.Comment.create({
      commentContent: "Excellent implementation of the Observer pattern!",
      commentDate: new Date("2025-01-29"),
      submission: submissionData, // Full submission object
      user: userData, // Full user object
    });

    // Update relationships with full objects
    courseData.assignments.push(assignmentData);
    courseData.lessons.push(lessonData);
    courseData.meetings.push(meetingData);
    courseData.questions.push(questionData);
    courseData.timetables.push(timetableData);
    await courseData.save();

    lessonData.lessonGroups.push(lessonGroupData);
    lessonData.questions.push(questionData);
    await lessonData.save();

    userData.comments.push(commentData);
    userData.courses.push(courseData);
    userData.submissions.push(submissionData);
    userData.timetable.push(timetableData);
    await userData.save();

    tagData.lessons.push(lessonData);
    await tagData.save();

    submissionData.comments.push(commentData);
    await submissionData.save();

    // Example of retrieving populated data
    const populatedUser = await models.User.findById(userData._id)
      .populate("campus")
      .populate("courseClass")
      .populate("role")
      .populate("courses")
      .populate("comments")
      .populate("submissions")
      .populate("timetable");

    console.log("Database seeded successfully!");

    return {
      role: roleData,
      campus: campusData,
      user: populatedUser,
      semester: semesterData,
      course: courseData,
      meeting: meetingData,
      lesson: lessonData,
      lessonGroup: lessonGroupData,
      question: questionData,
      tag: tagData,
      assignment: assignmentData,
      submission: submissionData,
      courseClass: courseClassData,
      timetable: timetableData,
      comment: commentData,
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Helper function to get populated data
async function getPopulatedData(model, id) {
  return await model.findById(id).populate({
    path: "",
    populate: { path: "" },
  });
}
async function runSeed() {
  try {
    await connectDB();
    const data = await seedDatabase();
    console.log("Seeding completed:", data);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}
module.exports = seedDatabase;
