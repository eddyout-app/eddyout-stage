import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Normalize for cross-platform (Windows vs Linux/Mac)
const normalizedDir = __dirname.replace(/\\/g, "/");

// ✅ Add stronger match — safer for all cases
const isDist = normalizedDir.includes("/dist/");

const envPath = isDist
  ? path.resolve(__dirname, "../../.env")
  : path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

console.log("DEBUG CONNECTION: .env loaded from:", envPath);
console.log("DEBUG CONNECTION: MONGODB_URI =", process.env.MONGODB_URI);

const mongoURI = process.env.MONGODB_URI as string;

if (!mongoURI) {
  throw new Error("❌ MONGODB_URI is not defined in .env");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("🌱 MongoDB connection successful"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default mongoose.connection;
