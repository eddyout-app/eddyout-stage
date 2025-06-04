import { Meals } from "../models/meals";
import { User } from "../models/user.js";
import { signToken } from "../utils/auth";
import { GraphQLError } from "graphql";
import { Crew } from "../models/crew"; // Make sure this import is correct

const resolvers = {
  Query: {
    getMealsForTrip: async (_parent: any, args: any) => {
      const { tripId } = args;
      try {
        const meals = await Meals.findAll({ where: { tripId } });
        return meals.length ? meals : null;
      } catch (error) {
        console.error("Error fetching meals:", error);
        throw new GraphQLError("Error getting meals");
      }
    },

    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (err) {
        throw new GraphQLError("Error getting users");
      }
    },

    getUser: async (_parent: any, args: any) => {
      try {
        const user = await User.findByPk(args.id);
        return user;
      } catch (err) {
        throw new GraphQLError("Error getting user");
      }
    },

    getAllCrew: async () => {
      try {
        const crewList = await Crew.findAll();
        return crewList;
      } catch (error) {
        console.error("Error fetching crew members:", error);
        throw new GraphQLError("Error fetching crew members");
      }
    },
  },

  Mutation: {
    createMeal: async (_parent: any, { input }: any) => {
      try {
        const meal = await Meals.create(input);
        return meal;
      } catch (error) {
        console.error("Error creating meal:", error);
        throw new GraphQLError("Error creating meal");
      }
    },

    createUser: async (_parent: any, { input }: any) => {
      try {
        const user = await User.create(input);
        const token = signToken(user.username, user.email, user.id);
        return { token, user };
      } catch (err) {
        throw new GraphQLError("Error creating user");
      }
    },

    login: async (_parent: any, args: any) => {
      const user = await User.findOne({ where: { email: args.email } });
      if (!user || !(await user.validatePassword(args.password))) {
        throw new GraphQLError("Could not authenticate user.");
      }

      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },

    createCrewMember: async (_parent: any, args: any) => {
      const { userId, tripId } = args;
      try {
        const crewMember = await Crew.create({ userId, tripId });
        return crewMember;
      } catch (error) {
        console.error("Error creating crew member:", error);
        throw new GraphQLError("Error creating crew member");
      }
    },
  },
};

export default resolvers;
