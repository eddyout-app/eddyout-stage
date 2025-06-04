import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const mongoURI = process.env.MONGODB_URI as string;

mongoose
  .connect(mongoURI)
  .then(() => console.log("🌱 MongoDB connection successful"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default mongoose.connection;
