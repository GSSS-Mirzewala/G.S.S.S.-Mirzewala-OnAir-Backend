import mongoose from "mongoose";

const QuoteModel = mongoose.Schema(
  {
    quote: { type: String, required: true, unique: true },
    showOn: { type: Number, required: true, unique: true }, // YYYYMMDD
  },
  { timestamps: true }
);

export default mongoose.model("Quote", QuoteModel);
