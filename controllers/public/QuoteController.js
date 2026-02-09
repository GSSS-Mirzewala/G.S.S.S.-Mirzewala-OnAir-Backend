// Local Modules
import ServerAsyncError from "../../utils/ServerAsyncErrors.js";
import QuoteModel from "../../models/QuoteModel.js";

export const fetchQuote = ServerAsyncError(async (req, res) => {
  const mongodata = await QuoteModel.aggregate([{ $sample: { size: 1 } }]);
  return res.status(200).json({ isSuccess: true, data: mongodata[0].quote });
});
