import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    gymId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true, // e.g. Salary, Electricity, Rent
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["salary", "electricity", "rent", "maintenance", "other"],
      default: "other",
    },

    note: {
      type: String,
    },
  },
  { timestamps: true } // 🔥 VERY IMPORTANT
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", expenseSchema);
