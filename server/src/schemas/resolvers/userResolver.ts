import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET || "mysecretkey"; // Replace with your real secret in production!

export const userResolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("userDetails");
    },
    user: async (_parent, { _id }) => {
      return await User.findById(_id).populate("userDetails");
    },
    me: async (_parent, _args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await User.findById(context.user._id).populate("userDetails");
    },
  },

  Mutation: {
    registerUser: async (
      _parent,
      { username, email, password, firstName, lastName, role }
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
        role: role || "user",
      });

      await user.save();

      const token = jwt.sign({ _id: user._id, email: user.email }, SECRET, {
        expiresIn: "7d",
      });

      return { token, user };
    },

    login: async (_parent, { email, password }) => {
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

    // // requestPasswordReset
    // requestPasswordReset: async (_parent, { email }) => {
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     // For security → do not reveal if email is valid
    //     return true;
    //   }

    //   // Generate reset token (simple JWT)
    //   const resetToken = jwt.sign(
    //     { _id: user._id, email: user.email },
    //     SECRET,
    //     { expiresIn: "1h" }
    //   );

    //   user.passwordResetToken = resetToken;
    //   user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour

    //   await user.save();

    //   // For dev: log the "email" to console
    //   const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    //   console.log(`Password reset link: ${resetUrl}`);

    //   return true;
    // },

    // // resetPassword
    // resetPassword: async (_parent, { token, newPassword }) => {
    //   try {
    //     // Verify token
    //     const payload = jwt.verify(token, SECRET);

    //     // Find user with matching token and valid expiration
    //     const user = await User.findOne({
    //       _id: payload._id,
    //       passwordResetToken: token,
    //       passwordResetExpires: { $gt: new Date() },
    //     });

    //     if (!user) {
    //       throw new Error("Invalid or expired reset token");
    //     }

    //     // Hash new password
    //     const hashedPassword = await bcrypt.hash(newPassword, 10);

    //     // Update user password + clear reset token fields
    //     user.password = hashedPassword;
    //     user.passwordResetToken = undefined;
    //     user.passwordResetExpires = undefined;

    //     await user.save();

    //     return true;
    //   } catch (err) {
    //     console.error("Reset password error:", err);
    //     throw new Error("Failed to reset password");
    //   }
    // },
  },
};
