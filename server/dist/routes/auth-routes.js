"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../models/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await index_js_1.User.findOne({
            where: { email },
            attributes: { include: ["password"] },
        });
        if (!user) {
            res.status(401).json({ message: "Authentication failed" });
            return;
        }
        const passwordIsValid = await bcrypt_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            res.status(401).json({ message: "Authentication failed" });
            return;
        }
        const secretKey = process.env.JWT_SECRET_KEY || "";
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        console.log("Error authenticating user", error);
    }
};
exports.login = login;
const signup = async (req, res) => {
    try {
        console.log("Received signup request:", req.body);
        const { firstName, lastName, username, email, password } = req.body;
        const existingUser = await index_js_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }
        const newUser = await index_js_1.User.create({
            firstName,
            lastName,
            username,
            email,
            password,
        });
        const secretKey = process.env.JWT_SECRET_KEY || "";
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, username: newUser.username }, secretKey, {
            expiresIn: "1h",
        });
        res.status(201).json({ token });
    }
    catch (error) {
        console.error("Signup failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.signup = signup;
const router = express_1.default.Router();
// POST /login - Login a user
router.post("/login", exports.login);
router.post("/signup", exports.signup);
exports.default = router;
