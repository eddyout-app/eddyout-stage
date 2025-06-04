import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGODB_URI as string;

mongoose.connect(mongoURI)
  .then(() => console.log("🌱 MongoDB connection successful"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default mongoose.connection;
