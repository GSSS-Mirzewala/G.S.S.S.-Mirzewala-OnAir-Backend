// Dependencies
import { format, getDate, getYear } from "date-fns";

// Models
import QuoteModel from "../../models/QuoteModel.js";

export const fetchQuote = async (req, res) => {
  const dateToday = `${getYear(new Date())}${format(new Date(), "MM")}${getDate(
    new Date()
  )}`;
  try {
    const Quote = await QuoteModel.findOne({ showOn: dateToday });
    res.status(200).json({ quote: Quote.quote });
  } catch (error) {
    console.error("Error Occured While Fetching... Today's Quote ->", error);
  }
};
