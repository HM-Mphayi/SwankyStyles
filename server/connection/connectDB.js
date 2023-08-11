const mongoose = require("mongoose");

const connectDB = async (URL) => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
