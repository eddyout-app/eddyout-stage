import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gearListSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    category: {
      type: String,
      enum: ["Kitchen", "Boat Gear", "Camp Gear", "Personal", "Other"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const GearList = model("GearList", gearListSchema);
export default GearList;
