// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import MemberModel from "../models/MemberModel.js";
import AsyncErrorHandler from "../utils/ServerAsyncErrors.js";
import ServerError from "../utils/ServerErrors.js";

export const getMyInfo = AsyncErrorHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);
  let mongodata = await MemberModel.findById(decoded.id)
    .populate("reference")
    .lean();

  if (!mongodata) {
    return next(new ServerError("USER_NOT_FOUND", 404));
  }

  return res.status(200).json({
    mongodata,
    success: true,
  });
});

export const getMyProfile = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const mongodata = await MemberModel.findById(id);
  if (!mongodata) {
    return next(new ServerError("USER_NOT_FOUND", 404));
  }

  res.status(200).json({ isSuccess: true, mongodata });
});
