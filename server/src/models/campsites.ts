// src/models/campsite.ts
import { Schema, model, Types } from "mongoose";

const campsiteSchema = new Schema(
  {
    tripId: {
      type: Types.ObjectId,
      ref: "Trip",
      required: true,
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
    timestamps: true,
  }
);

const Campsites = model("Campsite", campsiteSchema);

export default Campsites;
