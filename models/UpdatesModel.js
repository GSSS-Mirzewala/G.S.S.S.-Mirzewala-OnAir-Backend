import mongoose from "mongoose";

const ReleaseNoteSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Cumulative", "Minor", "Patch", "Security"],
  },
  version: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  fixes: { type: Object, required: true },
});

export default mongoose.model("Release_Note", ReleaseNoteSchema);
