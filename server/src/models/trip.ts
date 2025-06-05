import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    riverName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: any, value: Date) {
          return !this.endDate || value < this.endDate;
        },
        message: "Start date must be before end date",
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: any, value: Date) {
          return !this.startDate || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    putIn: {
      type: String,
      required: true,
    },
    takeOut: {
      type: String,
      required: true,
    },
    crewNum: {
      type: Number,
      required: true,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
