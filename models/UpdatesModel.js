import mongoose from "mongoose";

const ReleaseNotesModel = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Cumulative", "Minor", "Patch", "Security"],
  },
  version: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  fixes: { type: Object, required: true },
  notifyTill: { type: String, unique: true, required: true }, // YYYYMMDD
});

export default mongoose.model("Release_Notes", ReleaseNotesModel);
