const query = require("../db/queries");
const { Timetable, Assignment, User, Semester } = require("../db/model");
const mongoose = require("mongoose");
const addNewTimeTable = async (req, res) => {
  try {
    const { user, timeline, content, type } = req.body;
    const newTimeTable = new Timetable({
      user: new mongoose.Types.ObjectId(user),
      timeline: {
        time: timeline,
        content: content,
        type: type,
      },
    });

    const savedTimeTable = await newTimeTable.save();
    res.status(201).json(savedTimeTable);
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
const getUserTimeTable = async (req, res) => {
  try {
    const { id } = req.params;
    const timeTable = await Timetable.find({
      user: new mongoose.Types.ObjectId(id),
    }).select("timeline");
    if (!timeTable || timeTable.length === 0) {
      return res.status(404).json({ message: "Không có thời khóa biểu" });
    }
    res.status(200).json({ timetable: timeTable, isOk: true });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi máy chủ " });
  }
};

const getAllAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.find();
    if (!assignment || assignment.length === 0) {
      return res.status(404).json({ message: "Không có bài tập" });
    }
    res.status(200).json({ assignment: assignment, isOk: true });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi máy chủ " });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: [1, 2] },
    });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Không có người dùng" });
    }
    res.status(200).json({ users: users, isOk: true });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi máy chủ " });
  }
};

const getAllSemester = async (req, res) => {
  try {
    const semester = await Semester.find();
    if (!semester || semester.length === 0) {
      return res.status(404).json({ message: "Không có học kỳ" });
    }
    res.status(200).json({ semester: semester, isOk: true });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi máy chủ " });
  }
};

module.exports = {
  addNewTimeTable,
  getUserTimeTable,
  getAllAssignment,
  getAllUsers,
  getAllSemester,
};
