import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gearItemSchema = new Schema(
  {
    gearItem: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    category: {
      type: String,
      enum: ["Kitchen", "Boat Gear", "Camp Gear", "Personal", "Other"],
      default: "Other",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  { timestamps: true }
);

const GearItem = model("GearItem", gearItemSchema);
export default GearItem;
