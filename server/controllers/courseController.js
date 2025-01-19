const query = require("../db/queries");

const viewCourseDetail = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const course = await query.getCourseDetail(courseCode);
    if (course?.isOk === false ) {
      return res.status(400).json({
        error: course?.error ,
        isOk: false,
      });
    }
    res.json({
      course: course?.course,
      isOk: true,
    });
  } catch (error) {
    console.error("Course detail fetch error:", error);
    res.status(500).json({ error: "Internal server error ", isOk: false });
  }
};

const viewQuestionDetail = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await query.getQuestionById(questionId);
    if (question?.isOk === false) {
      return res.status(400).json({ error: question?.error, isOk: false });
    }
    res.json({ question: question?.question, isOk: true });
  } catch (error) {
    console.error("Question fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const viewCourseMeetings = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const meetings = await query.getMeetingByCourse(courseCode);
    if (meetings?.isOk === false) {
      return res.status(400).json({ error: meetings?.error, isOk: false });
    }
    res.json({
      meetings: meetings?.meetings,
      remainQuestions: meetings?.remainQuestions,
      isOk: true,
    });
  } catch (error) {
    console.error("Meeting fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const addQuestionSubmission = async (req, res) => {
  const { questionId } = req.params;
  const { content, submissionId, userId } = req.body;
  try {
    const newSubmission = await query.postQuestionSubmission(
      content,
      questionId,
      submissionId,
      userId
    );
    if (newSubmission?.isOk === false) {
      return res.status(400).json({ error: newSubmission?.error, isOk: false });
    }
    res.json({
      submission: newSubmission?.submission,
      allSubmission: newSubmission?.allSubmission,
      isOk: true,
    });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};

const viewQuestionSubmissions = async (req, res) => {
  const { questionId } = req.params;
  try {
    const submissions = await query.getSubmissionsByQuestion(questionId);
    if (submissions?.isOk === false) {
      return res.status(400).json({ error: submissions?.error, isOk: false });
    }

    const formattedSubmissions = await Promise.all(
      submissions?.submissions.map(async (submission) => ({
        ...submission,
        _id: submission._id.toString(),
        user: await query.getUserById(submission.user), // Replace user with user details
        comments: await Promise.all(
          submission.comments.map(async (comment) => ({
            ...comment,
            user: await query.getUserById(comment.user), // Replace comment user with user details
            _id: comment._id.toString(),
          }))
        ),
      }))
    );


    res.json({ submissions: formattedSubmissions, isOk: true });
  } catch (error) {
    console.error("Submission fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};


const addSubmissionComment = async (req, res) => {
  const { questionId, submissionId } = req.params;
  const { comment, userId } = req.body;
  try {
    const cmt = await query.postSubmissionComment(
      questionId,
      submissionId,
      comment,
      userId
    );
    if (cmt?.isOk === false) {
      return res.status(400).json({ error: cmt?.error, isOk: false });
    }
    res.json({
      comment: cmt?.newComment,
      allSubmission: cmt?.allSubmission,
      isOk: true,
    });
  } catch (error) {
    console.error("  error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};
module.exports = {
  viewCourseDetail,
  viewQuestionDetail,
  viewCourseMeetings,
  addQuestionSubmission,
  viewQuestionSubmissions,
  addSubmissionComment,
};
