// External Modules
import mongoose from "mongoose";

// Schema Structure
const TeacherSchema = mongoose.Schema(
  {
    status: {
      type: String,
      trim: true,
      enum: {
        values: ["ACTIVE", "ON_LEAVE", "RETIRED"],
        messages: "Invalid Status Type!",
      },
    },
    subject: { type: String, trim: true },
    assignedClass: { type: String, trim: true },
    designation: { type: String, trim: true },
  },
  { timestamps: true },
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Teacher", TeacherSchema);
