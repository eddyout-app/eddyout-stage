import mongoose from "mongoose";
const CREW_ROLE_OPTIONS = [
  "Leader",
  "Assistant Leader",
  "Medic",
  "Safety Officer",
  "Cook",
  "Crew",
];

const crewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  role: {
    type: String,
    enum: CREW_ROLE_OPTIONS, // 🏆 Enforce allowed roles
    required: true,
    default: "Crew",
  }, // Optional
});

const Crew = mongoose.model("Crew", crewSchema);
export default Crew;
