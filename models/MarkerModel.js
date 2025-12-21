// External Modules
import mongoose from "mongoose";

const MarkerSchema = mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    rollNumber: { type: Number, required: true },
    class: { type: Number, required: true },
    section: { type: Number, default: "A" },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    status: {
      type: String,
      trim: true,
      required: true,
      default: "NOT_ALLOCATED",
      enum: ["ABSENT", "PRESENT", "NOT_ALLOCATED"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Marker", MarkerSchema);
