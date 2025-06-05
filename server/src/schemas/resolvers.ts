import { Crew } from "../controllers/crewControllers";
import { Meals } from "../models/meals";
import { User } from '../models/user.js';
import { signToken } from "../utils/auth";
import { GraphQLError } from "graphql";



const resolvers = {
  Query: {
    getMealsForTrip: async (_parent: any, args: any, _context: any) => {
      const { tripId } = args;

      try {
        const meals = await Meals.findAll({ where: { tripId } });
        if (!meals || meals.length === 0) {
          return null;
        }
        return meals;
      } catch (error) {
        console.error('Error fetching meals:', error);
        throw new GraphQLError('Error getting meals');
      }
    },

    getUsers: async () => {
      try {
        return await User.findAll();
      } catch (err: any) {
        throw new GraphQLError('Error getting users');
      }
    },

    getUser: async (_parent: any, args: any) => {
      const { id } = args;
      try {
        return await User.findByPk(id);
      } catch (err: any) {
        throw new GraphQLError('Error getting user');
      }
    },

    getAllCrew: async (_parent: any, args: any) => {
      const { tripId } = args;
      try {
        const crewMembers = await Crew.findAll({
          where: { tripId },
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "firstName", "lastName", "email"]
            }
          ]
        });
        return crewMembers;
      } catch (err: any) {
        console.error(err);
        throw new GraphQLError(`Failed to fetch crew members: ${err.message}`);
      }
    }
  },

  Mutation: {
    createMeal: async (_parent: any, args: any) => {
      try {
        return await Meals.create(args);
      } catch (error: any) {
        console.error('Error creating meal:', error);
        throw new GraphQLError('Error creating meal');
      }
    },

    createCrew: async (_parent: any, args: any) => {
      try {
        const { tripId, userId } = args;
        return await Crew.create({ tripId, userId });
      } catch (err: any) {
        console.error(err);
        throw new GraphQLError('Error creating crew member');
      }
    },

    createUser: async (_parent: any, args: any) => {
      try {
        return await User.create(args);
      } catch (err: any) {
        throw new GraphQLError('Error creating user');
      }
    },

    login: async (_parent: any, args: any) => {
      const user = await User.findOne({ where: { email: args.email } });

      if (!user) {
        throw new GraphQLError('Could not authenticate user.');
      }

      const correctPw = await user.validatePassword(args.password);

      if (!correctPw) {
        throw new GraphQLError('Could not authenticate user.');
      }

      const token = signToken(user.username, user.email, user.id);
    
      // Return the token and the user
      return { token, user };
    }
  }
};

export default resolvers;
