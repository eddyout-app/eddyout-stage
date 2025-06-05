// src/models/campsite.ts
import { Schema, model, Types } from "mongoose";

const campsiteSchema = new Schema(
  {
    tripId: {
      type: Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: false, // Optional — not in your original model
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    weather: {
      temperature: Number,
      conditions: String,
      windSpeed: Number,
      humidity: Number,
      precipitation: Number,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const Campsites = model("Campsite", campsiteSchema);

export default Campsites;
