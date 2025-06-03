import mongoose from "mongoose";

// Define the UserDetails Schema
const UserDetailsSchema = new mongoose.Schema(
    {
        dietaryRestrictions: {
            type: [String],
            required: false, // Optional field
        },
        venmoHandle: {
            type: String,
            required: false, // Optional field
        },
    },
    {
        timestamps: true,
    }
);

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
export default UserDetails;
