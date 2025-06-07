import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Adjusted for compiled file in server/dist/config
const envPath = __dirname.includes("/dist")
  ? path.resolve(__dirname, "../../.env") // from dist/config → server/.env
  : path.resolve(__dirname, "../.env");   // from src/config → server/.env

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
