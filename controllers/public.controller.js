// Local Modules
import ServerAsyncError from "../utils/ServerAsyncErrors.js";
import quoteModel from "../models/quote.model.js";
import updatesModel from "../models/updates.model.js";

export const fetchQuote = ServerAsyncError(async (req, res) => {
  const mongodata = await quoteModel.aggregate([{ $sample: { size: 1 } }]);
  return res.status(200).json({ isSuccess: true, data: mongodata[0].quote });
});

export const fetchAllUpdates = ServerAsyncError(async (req, res) => {
  const mongodata = await updatesModel.find({}).lean();
  return res.status(200).json({
    isSuccess: true,
    data: mongodata,
  });
});

export const fetchLatestUpdate = ServerAsyncError(async (req, res) => {
  const mongodata = await updatesModel.findOne().sort({ createdAt: -1 }).lean();
  return res.status(200).json({
    isSuccess: true,
    data: mongodata,
  });
});
