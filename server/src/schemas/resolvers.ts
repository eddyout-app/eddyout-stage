
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
                return null; //return an error
            }
    
            return (meals);
        } catch (error) {
            console.error('Error fetching meals:', error);
            throw new GraphQLError('Error getting meals')
        }
    },
    getUsers: async (_parent: any, _args: any, _context: any) => {
        try {
            const users = await User.findAll();
            return (users);
        } catch (err: any) {
            // res.status(500).json({ message: err.message });
            throw new GraphQLError('Error getting users')
        }
    },
    getUser: async (_parent: any, args: any, _context: any) => {
        const {id} = args ;
        console.log(id)
        try {
            const user = await User.findByPk(id)
            return (user)
        } catch (err:any) {
            throw new GraphQLError('Error getting user')
        }
    }
  },
  Mutation: {
    createMeal: async (_parent: any, args: any, _context: any) => {
        try {
            const meal = await Meals.create(args);
            return meal;
        } catch (error: any) {
            console.error('Error creating meal:', error);
            throw new GraphQLError('Error creating meal')
        }
    }
  },
  createUser: async (_parent: any, args: any, _context: any) => {
      try {
          const user = await User.create(args);
          // res.status(201).json(user);
          return user;
      } catch (err: any) {
          // res.status(400).json({ message: err.message });
          throw new GraphQLError('Error creating user')
      }
  },
  login : async (_parent: any, args: any, _context: any) => {
      // Find a user with the provided email
      const user = await User.findOne({ where:{ 
        email: args.email
      } });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new Error('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.validatePassword(args.password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new Error('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user.id);
    
      // Return the token and the user
      return { token, user };
  },
};

export default resolvers;