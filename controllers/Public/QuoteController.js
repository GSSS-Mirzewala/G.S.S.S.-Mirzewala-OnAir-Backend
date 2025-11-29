// Models
import QuoteModel from "../../models/QuoteModel.js";

export const fetchQuote = async (req, res) => {
  try {
    const Quote = await QuoteModel.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json({ mongodata: Quote[0].quote });
  } catch (error) {
    console.error("Error Occured While Fetching... Today's Quote ->", error);
  }
};
