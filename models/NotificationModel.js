// External Modules
import mongoose from "mongoose";

// Schema Structure
const PostSchema = mongoose.Schema(
  {
    context: {
      type: String,
      required: [true, "Notification description is Required!"],
    },
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: [true, "Poster details are Required!"],
    },
    showTo: {
      type: String,
      required: [true, "Notification visibility is Required!"],
      default: "Everyone",
      enum: {
        values: ["Everyone", "Staff", "Schoolies"],
        message: "Invalid Visibility Type!",
      },
    },
    photoUrl: { type: String },
  },
  { timestamp: true },
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Post", PostSchema);
