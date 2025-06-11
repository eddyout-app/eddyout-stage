import mongoose from "mongoose";
const MEDICAL_TRAINING_LEVELS = [
  "None",
  "Basic First Aid",
  "CPR Certified",
  "Wilderness First Responder (WFR)",
  "Emergency Medical Technician (EMT)",
  "Paramedic or Higher",
];

const UserPreferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    dietaryRestrictions: {
      type: [String],
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
      type: String,
      enum: MEDICAL_TRAINING_LEVELS,
      required: false,
      default: undefined,
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
