"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meals_1 = require("../models/meals");
const user_js_1 = require("../models/user.js");
const auth_1 = require("../utils/auth");
const graphql_1 = require("graphql");
const resolvers = {
    Query: {
        getMealsForTrip: async (_parent, args, _context) => {
            const { tripId } = args;
            try {
                const meals = await meals_1.Meals.findAll({ where: { tripId } });
                if (!meals || meals.length === 0) {
                    return null; //return an error
                }
                return (meals);
            }
            catch (error) {
                console.error('Error fetching meals:', error);
                throw new graphql_1.GraphQLError('Error getting meals');
            }
        },
        getUsers: async (_parent, _args, _context) => {
            try {
                const users = await user_js_1.User.findAll();
                return (users);
            }
            catch (err) {
                // res.status(500).json({ message: err.message });
                throw new graphql_1.GraphQLError('Error getting users');
            }
        },
        getUser: async (_parent, args, _context) => {
            const { id } = args;
            console.log(id);
            try {
                const user = await user_js_1.User.findByPk(id);
                return (user);
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Error getting user');
            }
        }
    },
    Mutation: {
        createMeal: async (_parent, args, _context) => {
            try {
                const meal = await meals_1.Meals.create(args);
                return meal;
            }
            catch (error) {
                console.error('Error creating meal:', error);
                throw new graphql_1.GraphQLError('Error creating meal');
            }
        }
    },
    createUser: async (_parent, args, _context) => {
        try {
            const user = await user_js_1.User.create(args);
            // res.status(201).json(user);
            return user;
        }
        catch (err) {
            // res.status(400).json({ message: err.message });
            throw new graphql_1.GraphQLError('Error creating user');
        }
    },
    login: async (_parent, args, _context) => {
        // Find a user with the provided email
        const user = await user_js_1.User.findOne({ where: {
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
        const token = (0, auth_1.signToken)(user.username, user.email, user.id);
        // Return the token and the user
        return { token, user };
    },
};
exports.default = resolvers;
