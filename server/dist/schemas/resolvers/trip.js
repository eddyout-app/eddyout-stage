"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripResolvers = void 0;
const trip_1 = __importDefault(require("../../models/trip"));
exports.tripResolvers = {
    Query: {
        trips: async () => await trip_1.default.find(),
        trip: async (_, { id }) => {
            return await trip_1.default.findById(id);
        }
    },
    Mutation: {
        createTrip: async (_, args) => {
            const newTrip = await trip_1.default.create({ ...args });
            return newTrip;
        },
        updateTrip: async (_, { id, ...updates }) => {
            const updatedTrip = await trip_1.default.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true
            });
            return updatedTrip;
        },
        deleteTrip: async (_, { id }) => {
            await trip_1.default.findByIdAndDelete(id);
            return "Trip deleted";
        }
    }
};
