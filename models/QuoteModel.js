import mongoose from "mongoose";

const QuoteModel = mongoose.Schema(
  {
    quote: { type: String, required: true, unique: true },
    author: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", QuoteModel);
