import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gearCatalogItemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Kitchen", "Boat Gear", "Camp Gear", "Personal", "Other"],
      default: "Other",
    },
    perPersonQty: {
      type: Number,
      default: 0, // If 0, no per-person calculation
    },
    unit: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const GearCatalogItem = model("GearCatalogItem", gearCatalogItemSchema);
export default GearCatalogItem;
