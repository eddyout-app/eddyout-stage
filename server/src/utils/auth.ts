import jwt from "jsonwebtoken";
import { Request } from "express";

interface JwtPayload {
  email: string;
  _id?: string;
}

// This function will be passed to Apollo Server's context field
export const authMiddleware = ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ").pop()?.trim();

  if (!token) return { user: null };

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return { user };
  } catch (err) {
    console.warn("Invalid token:", err);
    return { user: null };
  }
};
