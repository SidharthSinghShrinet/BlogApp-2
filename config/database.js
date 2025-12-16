import mongoose from "mongoose";

const connectDB = async () => {
  console.log(`Before connection  :${mongoose.connection.readyState}`);
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to DB");
    return;
  }
  const client = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "BlogApp1",
  });
  console.log("MongoDB Connected with:", client.connection.db.databaseName);
  console.log(`After connection:${mongoose.connection.readyState}`);
};

export default connectDB;
