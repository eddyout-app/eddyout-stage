import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gearItemSchema = new Schema(
    {
        gearItem: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        category: {
            type: String,
            enum: ["Kitchen", "Boat Gear", "Camp Gear", "Personal", "Other"], // You define these!
            default: "Other",
        },
        claimedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        tripId: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
        },
        gearListId: {
            type: Schema.Types.ObjectId,
            ref: "GearList",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const GearItem = model("GearItem", gearItemSchema);
export default GearItem;
