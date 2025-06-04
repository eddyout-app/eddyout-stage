"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meals_1 = require("../models/meals");
const user_js_1 = require("../models/user.js");
const auth_1 = require("../utils/auth");
const graphql_1 = require("graphql");
const crew_1 = require("../models/crew"); // Make sure this import is correct
const resolvers = {
    Query: {
        getMealsForTrip: async (_parent, args) => {
            const { tripId } = args;
            try {
                const meals = await meals_1.Meals.findAll({ where: { tripId } });
                return meals.length ? meals : null;
            }
            catch (error) {
                console.error("Error fetching meals:", error);
                throw new graphql_1.GraphQLError("Error getting meals");
            }
        },
        getUsers: async () => {
            try {
                const users = await user_js_1.User.findAll();
                return users;
            }
            catch (err) {
                throw new graphql_1.GraphQLError("Error getting users");
            }
        },
        getUser: async (_parent, args) => {
            try {
                const user = await user_js_1.User.findByPk(args.id);
                return user;
            }
            catch (err) {
                throw new graphql_1.GraphQLError("Error getting user");
            }
        },
        getAllCrew: async () => {
            try {
                const crewList = await crew_1.Crew.findAll();
                return crewList;
            }
            catch (error) {
                console.error("Error fetching crew members:", error);
                throw new graphql_1.GraphQLError("Error fetching crew members");
            }
        },
    },
    Mutation: {
        createMeal: async (_parent, { input }) => {
            try {
                const meal = await meals_1.Meals.create(input);
                return meal;
            }
            catch (error) {
                console.error("Error creating meal:", error);
                throw new graphql_1.GraphQLError("Error creating meal");
            }
        },
        createUser: async (_parent, { input }) => {
            try {
                const user = await user_js_1.User.create(input);
                const token = (0, auth_1.signToken)(user.username, user.email, user.id);
                return { token, user };
            }
            catch (err) {
                throw new graphql_1.GraphQLError("Error creating user");
            }
        },
        login: async (_parent, args) => {
            const user = await user_js_1.User.findOne({ where: { email: args.email } });
            if (!user || !(await user.validatePassword(args.password))) {
                throw new graphql_1.GraphQLError("Could not authenticate user.");
            }
            const token = (0, auth_1.signToken)(user.username, user.email, user.id);
            return { token, user };
        },
        createCrewMember: async (_parent, args) => {
            const { userId, tripId } = args;
            try {
                const crewMember = await crew_1.Crew.create({ userId, tripId });
                return crewMember;
            }
            catch (error) {
                console.error("Error creating crew member:", error);
                throw new graphql_1.GraphQLError("Error creating crew member");
            }
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map