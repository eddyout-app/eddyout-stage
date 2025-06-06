import { Schema, model, Types } from "mongoose";

const mealSchema = new Schema(
  {
    tripId: {
      type: Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    mealType: {
      type: String,
      required: true,
    },
    mealName: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Meal = model("Meal", mealSchema);

export default Meal;
