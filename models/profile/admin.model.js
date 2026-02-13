// External Modules
import mongoose from "mongoose";

// Schema Strucutre
const AdminSchema = mongoose.Schema(
  {
    permissionsLevel: {
      type: String,
      enum: ["FULL", "MODERATE", "LOW"],
      default: "FULL",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "ON_LEAVE", "RETIRED"],
      default: "ACTIVE",
    },
  },
  { timestamp: true },
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Admin", AdminSchema);
