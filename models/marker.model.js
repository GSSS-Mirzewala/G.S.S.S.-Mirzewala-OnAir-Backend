// External Modules
import mongoose from "mongoose";

const MarkerSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    class: { type: Number, required: true },
    section: { type: Number, default: "A" },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ["ABSENT", "PRESENT", "UNALLOCATED"],
      default: "UNALLOCATED",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Marker", MarkerSchema);
