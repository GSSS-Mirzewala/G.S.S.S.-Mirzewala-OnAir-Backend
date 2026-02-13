// Local Modules
import ServerAsyncError from "../../utils/ServerAsyncErrors.js";
import updatesModel from "../../models/updates.model.js";

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
