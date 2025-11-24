// External Modules
import mongoose from "mongoose";

// Schema Structure
const StudentModel = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      unique: [true, "ID must be Unique!"],
      trim: true,
    },
    class: { type: Number },
    section: { type: String, trim: true },
    rollNumber: { type: Number },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    dateOfAdmission: { type: Date },
  },
  { timestamps: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Student", StudentModel);
