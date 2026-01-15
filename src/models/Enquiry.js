import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    gymId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    note: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "new",
        "no_answer",
        "not_interested",
        "interested",
        "will_visit",
        "converted",
      ],
      default: "new",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
