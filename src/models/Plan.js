import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },

    gymId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", planSchema);
