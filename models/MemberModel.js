// External Modules
import mongoose from "mongoose";

// Schema Structure
const MemberSchema = mongoose.Schema(
  {
    miPin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [11, "MI PIN Should at least contain 11 Characters!"],
      maxlength: [11, "MI PIN Should only contain 11 Characters!"],
      immutable: true,
      match: [
        /^@(STD|TCH|ADM)\d{4}[A-Z]{3}$/,
        "MI PIN Should be in a Fixed Pattern!",
      ],
    },
    password: { type: String, required: true, select: false },
    userType: {
      type: String,
      trim: true,
      enum: ["Student", "Teacher", "Admin"],
    },
    accountStatus: {
      type: String,
      trim: true,
      enum: ["ACTIVE", "BLOCKED", "FORCE_SUSPENDED", "UPGRADED"], // FORCE_SUSPENDED = Acc. Suspended by School. UPGRADED = Acc. Upgraded to 'Alumni' by School Association.
      default: "ACTIVE",
    },
    name: { type: String, required: true, trim: true },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Invalid Gender Choosen!",
      },
    },
    dateOfBirth: { type: Date, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    avatarUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dbelpwtoy/image/upload/f_auto,q_auto/v1767074898/Avatar_si1ngf.svg",
    },
    phone: { type: Number },
    address: { type: String },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType",
      required: true,
    },
  },
  { timestamps: true }
);

// Virtuals
MemberSchema.virtual("age").get(function () {
  const diff = Date.now() - this.dateOfBirth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

// Configurations
MemberSchema.set("toJSON", { virtuals: true });
MemberSchema.set("toObject", { virtuals: true });

// Indexes
MemberSchema.index({ userType: 1, accountStatus: 1 });

// Creating & Exporting Model of Schema Structure
export default mongoose.model("Member", MemberSchema);
