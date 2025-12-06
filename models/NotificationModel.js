// External Modules
import mongoose from "mongoose";

// Schema Structure
const PostSchema = mongoose.Schema(
  {
    context: {
      type: String,
      required: [true, "Notification description is Required!"],
    },
    postedBy: {
      type: String,
      required: [true, "Poster details are Required!"],
    }, // USTA PIN
    showTo: {
      type: String,
      required: [true, "Notification visibility is Required!"],
      default: "Everyone",
      enum: {
        values: ["Everyone", "Staff", "Schoolies", "Non-Schoolies"],
        message: "Invalid Visibility Type!",
      },
    },
    photoUrl: { type: String },
  },
  { timestamp: true }
);

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Post", PostSchema);
