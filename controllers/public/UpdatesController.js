// Local Modules
import ServerError from "../../utils/ServerErrors.js";
import ServerAsyncError from "../../utils/ServerAsyncErrors.js";
import UpdatesModel from "../../models/UpdatesModel.js";

export const fetchAllUpdates = ServerAsyncError(async (req, res) => {
  const mongodata = await UpdatesModel.find();

  if (!mongodata) {
    return next(new ServerError("UPDATES_NOT_FOUND", 404))
  }

  return res.status(200).json({
    success: true,
    mongodata,
  });
});

export const fetchLatestUpdate = ServerAsyncError(async (req, res) => {
  const mongodata = await UpdatesModel.findOne().sort({ createdAt: -1 });

  if (!mongodata) {
    return next(new ServerError("UPDATE_NOT_FOUND", 404))
  }

  return res.status(200).json({
    success: true,
    mongodata,
  });
});
