// Local Modules
import MemberModel from "../models/MemberModel.js";
import AsyncErrorHandler from "../utils/ServerAsyncErrors.js";
import ServerError from "../utils/ServerErrors.js";

export const getProfile = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const mongodata = await MemberModel.findById(id);
  if (!mongodata) {
    return next(new ServerError("USER_NOT_FOUND", 404));
  }

  res.status(200).json({ isSuccess: true, mongodata });
});
