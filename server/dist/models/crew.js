"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crewSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Trip", required: true },
    role: { type: String }, // Optional
});
const Crew = mongoose_1.default.model("Crew", crewSchema);
exports.default = Crew;
