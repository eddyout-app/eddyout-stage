"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trip_1 = __importDefault(require("../models/trip"));
const resolvers = {
    Query: {
        trips: async () => {
            return await trip_1.default.find();
        }
    },
    Mutation: {
        addTrip: async (_, { input }) => {
            return await trip_1.default.create(input);
        }
    }
};
exports.default = resolvers;
