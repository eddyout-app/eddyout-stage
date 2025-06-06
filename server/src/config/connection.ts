import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Log current working directory to verify where it's running
// console.log("DEBUG SERVER: Current Working Directory:", process.cwd());
// console.log(path.resolve(__dirname));
// console.log(path.join(__dirname, "../../.."));
// Load environment variables from .env file
dotenv.config({ path: path.resolve("../.env") });

// Log all environment variables to verify they are loaded correctly
// console.log("DEBUG CONNECTION: Environment Variables Loaded:", process.env);

// Log the Mongo URI specifically to ensure it's set correctly
console.log("DEBUG CONNECTION: MONGODB_URI =", process.env.MONGODB_URI);

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
