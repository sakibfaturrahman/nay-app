const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  console.log(`Connecting to MongoDB with URI: ${uri}`);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn && conn.connection) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log("MongoDB connected but no connection object returned.");
    }
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // stop server agar tidak lanjut tanpa DB
  }
};

module.exports = connectDB;
