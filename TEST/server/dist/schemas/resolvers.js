"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meals_1 = require("../models/meals");
const resolvers = {
    Query: {
        meals: async () => await meals_1.Meals.findAll(),
    },
};
exports.default = resolvers;
