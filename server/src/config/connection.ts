import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check if Mongo URI is undefined
const mongoURI = process.env.MONGODB_URI as string;

if (!mongoURI) {
  console.error("❌ MongoDB URI is not defined in .env file");
  throw new Error("MongoDB URI is not defined in .env file");
}

// Connect to MongoDB
mongoose
  .connect(mongoURI) // Mongoose 6.x no longer needs options like useNewUrlParser or useUnifiedTopology
  .then(() => console.log("🌱 MongoDB connection successful"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default mongoose.connection;
