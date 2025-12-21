// Local Modules
import ServerAsyncError from "../../utils/ServerAsyncErrors.js";
import UpdatesModel from "../../models/UpdatesModel.js";

export const fetchAllUpdates = ServerAsyncError(async (req, res) => {
  const mongodata = await UpdatesModel.find();
  return res.status(200).json({
    success: true,
    mongodata,
  });
});

export const fetchLatestUpdate = ServerAsyncError(async (req, res) => {
  const mongodata = await UpdatesModel.findOne().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    mongodata,
  });
});
