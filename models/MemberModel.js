// External Modules
import mongoose from "mongoose";

// Schema Structure
const MemberSchema = mongoose.Schema(
  {
    ustaPin: {
      type: String,
      required: [true, "USTA PIN is Required!"],
      unique: [true, "USTA PIN Should be Unique!"],
      trim: true,
      minlength: [11, "USTA PIN Should at least contain 11 Characters!"],
      maxlength: [11, "USTA PIN Should only contain 11 Characters!"],
      immutable: true,
      match: [
        /^@(STD|TCH|ADM)\d{4}[A-Z]{3}$/,
        "USTA PIN Should be in a Fixed Pattern!",
      ],
    },
    password: { type: String, required: [true, "Password is Required!"] },
    userType: {
      type: String,
      trim: true,
      enum: {
        values: ["STD", "TCH", "ADM"],
        message: "Invalid UserType Selected!",
      },
    },
    accountStatus: {
      type: String,
      trim: true,
      enum: {
        values: ["ACTIVE", "BLOCKED", "FORCE_SUSPENDED", "UPGRADED"],
        message: "Invalid Account Status!",
      }, // FORCE_SUSPENDED = Acc. Suspended by School. UPGRADED = Acc. Upgraded to 'Alumni' by School Association.
    },
    name: { type: String, trim: true },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Invalid Gender Choosen!",
      },
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      trim: true,
      lowercase: [true, "Email should always in be in Lowercase Characters!"],
    },
    phone: { type: Number },
    address: { type: String },
    photoUrl: { type: String },

    // Referencers
    studentRef: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    teacherRef: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    adminRef: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// Virtuals
MemberSchema.virtual("age").get(() => {
  const diff = Date.now - this.dateOfBirth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Member", MemberSchema);
