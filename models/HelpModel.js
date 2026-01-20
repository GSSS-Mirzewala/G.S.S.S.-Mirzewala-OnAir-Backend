// External Modules
import mongoose from "mongoose";

// Schema Structure
const HelpSchema = mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, index: true },
    ip: {type: String, required: true, trim: true, index: true},
    concern: { type: String, required: true },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "RESOLVED"],
        message: "Invalid Status Type!",
      },
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Help", HelpSchema);
