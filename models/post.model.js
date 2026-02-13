// External Modules
import mongoose from "mongoose";

// Schema Structure
const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Notification description is Required!"],
      maxLength: 10000,
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: [true, "Poster details are Required!"],
      index: true,
    },
    showTo: {
      type: String,
      default: "Everyone",
      enum: {
        values: ["Everyone", "Staff", "Schoolies"],
        message: "Invalid Visibility Type!",
      },
    },
    photoUrl: { type: String, default: null },
  },
  { timestamps: true },
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Post", PostSchema);
