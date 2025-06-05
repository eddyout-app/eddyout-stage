import mongoose from "mongoose";

const crewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    role: { type: String }, // Optional
});

const Crew = mongoose.model("Crew", crewSchema);
export default Crew;
