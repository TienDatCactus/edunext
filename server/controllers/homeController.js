const query = require("../db/queries");

const viewCourses = async (req, res) => {
  try {
    const { year, month } = req.params;
    const courses = await query.getCurrentCourses(year, month);
    if (courses?.isOk === false) {
      return res.json({ error: courses?.error, isOk: courses?.isOk });
    } else if (courses?.isOk === true) {
      res.json({ courses: courses?.courses, isOk: courses?.isOk });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error ", isOk: false });
  }
};

module.exports = {
  viewCourses,
};
