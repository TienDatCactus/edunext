const query = require("../db/queries");
const {Timetable} = require('../db/model');
const addNewTimeTable = async (req, res) => {
    try {
      const { user, timeline, content, type } = req.body;
      console.log("body:",req.body)
      const newTimeTable = new Timetable({
        user,
        timeline,
        content,
        type,
      });
  
      const savedTimeTable = await newTimeTable.save();
      res.status(201).json(savedTimeTable);
    } catch (error) {
      console.error('Lỗi:', error);
      res.status(500).json({ error: 'Lỗi máy chủ' });
    }
  };
  

module.exports = {
    addNewTimeTable,
};