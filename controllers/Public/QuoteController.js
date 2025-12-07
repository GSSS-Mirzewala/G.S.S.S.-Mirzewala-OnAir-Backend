// Models
import QuoteModel from "../../models/QuoteModel.js";

export const fetchQuote = async (req, res) => {
  try {
    const mongodata = await QuoteModel.aggregate([{ $sample: { size: 1 } }]);
    return res.status(200).json({ mongodata: mongodata[0].quote });
  } catch (error) {
    console.error("Error Occured While Fetching... Today's Quote ->", error);
  }
};
