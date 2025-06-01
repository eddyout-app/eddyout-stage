import express from "express";
import { Request, Response } from "express";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });
    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY || "";

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.log("Error authenticating user", error);
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received signup request:", req.body);
    const { firstName, lastName, username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const router = express.Router();

// POST /login - Login a user
router.post("/login", login);
router.post("/signup", signup);

export default router;
