import mongoose from "mongoose";

const QuoteSchema = mongoose.Schema(
  {
    quote: { type: String, required: true, unique: true },
    author: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", QuoteSchema);
