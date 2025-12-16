// import mongoose from "mongoose";

// const connectDB = async () => {
//   // console.log(`Before connection  :${mongoose.connection.readyState}`);
//   if (mongoose.connection.readyState === 1) {
//     // console.log("Already connected to DB");
//     return;
//   }
//   const client = await mongoose.connect(process.env.MONGO_URI, {
//     dbName: "BlogApp1",
//   });
//   console.log("MongoDB Connected with:", client.connection.db.databaseName);
//   // console.log(`After connection:${mongoose.connection.readyState}`);
// };

// export default connectDB;

// config/database.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI not defined");
}

// Global cache (VERY IMPORTANT for Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // 1️⃣ Reuse existing connection (warm function)
  if (cached.conn) {
    return cached.conn;
  }

  // 2️⃣ Create connection ONCE (cold function)
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "BlogApp1",
      bufferCommands: false, // Prevent query buffering
      serverSelectionTimeoutMS: 5000, // Fail fast if DB unreachable
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
