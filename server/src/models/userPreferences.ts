import mongoose from "mongoose";

const UserPreferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1 preferences doc per user
    },
    dietaryRestrictions: {
      type: [String],
      required: false,
    },
    venmoHandle: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    allergies: {
      type: String,
      required: false,
    },
    medicalConditions: {
      type: String,
      required: false,
    },
    emergencyContactName: {
      type: String,
      required: false,
    },
    emergencyContactPhone: {
      type: String,
      required: false,
    },
    medicalTraining: {
      type: Boolean,
      required: false,
    },
    preferredPaymentMethod: {
      type: String,
      required: false,
    },
    paymentHandle: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const UserPreferences = mongoose.model(
  "UserPreferences",
  UserPreferencesSchema
);

export default UserPreferences;
