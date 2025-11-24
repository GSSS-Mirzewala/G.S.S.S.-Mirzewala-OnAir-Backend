// External Modules
import mongoose from "mongoose";

// Schema Structure
const TeacherModel = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      unique: [true, "ID must be Unique!"],
      trim: true,
    },
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
    qualification: { type: String, trim: true },
    dateOfJoining: { type: Date },
  },
  { timestamps: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Teacher", TeacherModel);
