// External Modules
import mongoose from "mongoose";

// Schema Structure
const HelpSchema = mongoose.Schema(
  {
    email: { type: String, required: [true, "Email is Required"], trim: true },
    concern: { type: String, required: [true, "Concern is Required!"] },
    status: {
      type: String,
      default: "PENDING",
      enum: {
        values: ["PENDING", "RESOLVED"],
        message: "Invalid Status Type!",
      },
    },
  },
  { timestamps: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Help", HelpSchema);
