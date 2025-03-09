const query = require("../db/queries");
const { Timetable } = require("../db/model");
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
module.exports = {
  addNewTimeTable,
  getUserTimeTable,
};
