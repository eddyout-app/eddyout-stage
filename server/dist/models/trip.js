"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TripSchema = new mongoose_1.default.Schema({
    riverName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return !this.endDate || value < this.endDate;
            },
            message: "Start date must be before end date",
        },
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return !this.startDate || value > this.startDate;
            },
            message: "End date must be after start date",
        },
    },
    putIn: {
        type: String,
        required: true,
    },
    takeOut: {
        type: String,
        required: true,
    },
    crewNum: {
        type: Number,
        required: true,
    },
    organizerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Trip = mongoose_1.default.model("Trip", TripSchema);
exports.default = Trip;
