import User from "../../models/user";
import { signToken } from "../../utils/auth";

export const userResolvers = {
  Query: {
    allUsers: async () => {
      return await User.find().populate("friends thoughts");
    },

    userById: async (_parent: any, { userId }: { userId: string }) => {
      return await User.findById(userId).populate("friends thoughts");
    },
  },

  Mutation: {
    createUser: async (_parent: any, { username, email, password }: any) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser.username, newUser.email, newUser._id);
      return { token, user: newUser };
    },

    updateUser: async (
      _parent: any,
      { userId, username, email }: any
    ) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      ).populate("friends thoughts");

      return updatedUser;
    },

    addFriend: async (_parent: any, { userId, friendId }: any) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate("friends thoughts");

      return user;
    },

    removeFriend: async (_parent: any, { userId, friendId }: any) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate("friends thoughts");

      return user;
    },
  },
};
