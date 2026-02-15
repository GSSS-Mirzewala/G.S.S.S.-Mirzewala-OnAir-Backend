// External Modules
import mongoose from "mongoose";

const MusicSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Prayer", "Motivational", "Other"],
      required: true,
    },
    audioUrl: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Music", MusicSchema);
