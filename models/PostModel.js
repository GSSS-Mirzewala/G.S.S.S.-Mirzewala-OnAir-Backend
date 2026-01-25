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
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: [true, "Poster details are Required!"],
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
  { timestamp: true },
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Post", PostSchema);
