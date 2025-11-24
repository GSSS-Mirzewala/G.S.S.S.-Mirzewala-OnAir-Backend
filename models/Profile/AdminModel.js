// External Modules
import mongoose from "mongoose";

// Schema Strucutre
const AdminModel = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      unique: [true, "ID must be Unique!"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "ON_LEAVE", "RETIRED"],
        message: "Invalid Status Type!",
      },
      trim: true,
    },
  },
  { timestamp: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Admin", AdminModel);
