-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "FEID" TEXT NOT NULL,
    "campusId" INTEGER,
    "classId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Campus" (
    "campusId" SERIAL NOT NULL,
    "campusName" TEXT NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("campusId")
);

-- CreateTable
CREATE TABLE "Semester" (
    "semesterId" SERIAL NOT NULL,
    "semesterName" TEXT NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("semesterId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "description" TEXT,
    "semesterId" INTEGER NOT NULL,
    "instructorId" INTEGER,
    "courseCode" TEXT NOT NULL,
    "meetingId" INTEGER[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "meetingId" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "meetingType" TEXT NOT NULL,
    "meetingLink" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("meetingId")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "lessonId" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "tagId" INTEGER,
    "content" TEXT,
    "deadline" TIMESTAMP(3),

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("lessonId")
);

-- CreateTable
CREATE TABLE "LessonGroup" (
    "lessonGroupId" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "userId" INTEGER[],

    CONSTRAINT "LessonGroup_pkey" PRIMARY KEY ("lessonGroupId")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionId" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "assignmentId" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignmentId")
);

-- CreateTable
CREATE TABLE "Submission" (
    "submissionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "submissionContent" TEXT NOT NULL,
    "submissionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("submissionId")
);

-- CreateTable
CREATE TABLE "CourseClass" (
    "classId" SERIAL NOT NULL,
    "className" TEXT NOT NULL,

    CONSTRAINT "CourseClass_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "Timetable" (
    "timetableId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("timetableId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "submissionId" INTEGER,
    "commentContent" TEXT NOT NULL,
    "commentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_FEID_key" ON "User"("FEID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("campusId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "CourseClass"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("semesterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("tagId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonGroup" ADD CONSTRAINT "LessonGroup_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("lessonId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("lessonId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("submissionId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
