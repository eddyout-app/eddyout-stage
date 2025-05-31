"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// This function will be passed to Apollo Server's context field
const authMiddleware = ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ").pop()?.trim();
    if (!token)
        return { user: null };
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "";
        const user = jsonwebtoken_1.default.verify(token, secretKey);
        return { user };
    }
    catch (err) {
        console.warn("Invalid token:", err);
        return { user: null };
    }
};
exports.authMiddleware = authMiddleware;
