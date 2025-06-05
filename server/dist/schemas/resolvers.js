"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crewControllers_1 = require("../controllers/crewControllers");
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
                    return null;
                }
                return meals;
            }
            catch (error) {
                console.error('Error fetching meals:', error);
                throw new graphql_1.GraphQLError('Error getting meals');
            }
        },
        getUsers: async () => {
            try {
                return await user_js_1.User.findAll();
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Error getting users');
            }
        },
        getUser: async (_parent, args) => {
            const { id } = args;
            try {
                return await user_js_1.User.findByPk(id);
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Error getting user');
            }
        },
        getAllCrew: async (_parent, args) => {
            const { tripId } = args;
            try {
                const crewMembers = await crewControllers_1.Crew.findAll({
                    where: { tripId },
                    include: [
                        {
                            model: user_js_1.User,
                            as: "user",
                            attributes: ["id", "username", "firstName", "lastName", "email"]
                        }
                    ]
                });
                return crewMembers;
            }
            catch (err) {
                console.error(err);
                throw new graphql_1.GraphQLError(`Failed to fetch crew members: ${err.message}`);
            }
        }
    },
    Mutation: {
        createMeal: async (_parent, args) => {
            try {
                return await meals_1.Meals.create(args);
            }
            catch (error) {
                console.error('Error creating meal:', error);
                throw new graphql_1.GraphQLError('Error creating meal');
            }
        },
        createCrew: async (_parent, args) => {
            try {
                const { tripId, userId } = args;
                return await crewControllers_1.Crew.create({ tripId, userId });
            }
            catch (err) {
                console.error(err);
                throw new graphql_1.GraphQLError('Error creating crew member');
            }
        },
        createUser: async (_parent, args) => {
            try {
                return await user_js_1.User.create(args);
            }
            catch (err) {
                throw new graphql_1.GraphQLError('Error creating user');
            }
        },
        login: async (_parent, args) => {
            const user = await user_js_1.User.findOne({ where: { email: args.email } });
            if (!user) {
                throw new graphql_1.GraphQLError('Could not authenticate user.');
            }
            const correctPw = await user.validatePassword(args.password);
            if (!correctPw) {
                throw new graphql_1.GraphQLError('Could not authenticate user.');
            }
            const token = (0, auth_1.signToken)(user.username, user.email, user.id);
            // Return the token and the user
            return { token, user };
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map