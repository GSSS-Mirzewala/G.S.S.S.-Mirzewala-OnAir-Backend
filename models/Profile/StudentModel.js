// External Modules
import mongoose from "mongoose";

// Schema Structure
const StudentSchema = mongoose.Schema(
  {
    class: { type: Number },
    section: { type: String, trim: true, default: "A" },
    rollNumber: { type: Number },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    dateOfAdmission: { type: Date },
  },
  { timestamps: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Student", StudentSchema);
