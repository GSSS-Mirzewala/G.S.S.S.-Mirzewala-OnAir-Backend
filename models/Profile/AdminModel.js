// External Modules
import mongoose from "mongoose";

// Schema Strucutre
const AdminSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "ON_LEAVE", "RETIRED"],
        message: "Invalid Admin Status Type!",
      },
      trim: true,
    },
  },
  { timestamp: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Admin", AdminSchema);
