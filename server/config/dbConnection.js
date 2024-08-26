const mongoose = require("mongoose");
const donenv = require("dotenv").config();

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (err) {
    console.error("failed to connect with Database");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
