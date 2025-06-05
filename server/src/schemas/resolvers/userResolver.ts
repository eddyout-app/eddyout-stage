// src/schemas/resolvers/userResolvers.ts
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET || "mysecretkey"; // Replace with your real secret in production!

export const userResolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("userDetails");
    },
    user: async (_parent: any, { _id }: { _id: string }) => {
      return await User.findById(_id).populate("userDetails");
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await User.findById(context.user._id).populate("userDetails");
    },
  },

  Mutation: {
    registerUser: async (
      _parent: any,
      {
        username,
        email,
        password,
        firstName,
        lastName,
      }: {
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      }
    ) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      await user.save();

      const token = jwt.sign({ _id: user._id, email: user.email }, SECRET, {
        expiresIn: "7d",
      });

      return { token, user };
    },

    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email }).populate("userDetails");

      if (!user) {
        throw new Error("User not found");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign({ _id: user._id, email: user.email }, SECRET, {
        expiresIn: "7d",
      });

      return { token, user };
    },
  },
};
