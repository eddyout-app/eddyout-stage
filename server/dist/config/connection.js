"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGODB_URI;
mongoose_1.default.connect(mongoURI)
    .then(() => console.log("🌱 MongoDB connection successful"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
exports.default = mongoose_1.default.connection;
