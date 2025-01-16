var mongoose = require("mongoose");
//Set up default mongoose connection
var mongoDB = process.env.DATABASE_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
