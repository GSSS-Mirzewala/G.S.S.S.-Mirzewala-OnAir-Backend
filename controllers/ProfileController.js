// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import memberModel from "../models/member.model.js";
import AsyncErrorHandler from "../utils/ServerAsyncErrors.js";
import ServerError from "../utils/ServerErrors.js";
import {
  UploadBufferToCloudinary,
  DeleteFromCloudinary,
} from "../utils/cloudinary.js";

export const getMe = AsyncErrorHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);
  let mongodata = await memberModel
    .findById(decoded.id)
    .populate("reference")
    .lean();

  if (!mongodata) {
    return next(new ServerError("ACCOUNT_NOT_FOUND", 404));
  }

  return res.status(200).json({
    data: mongodata,
    isSuccess: true,
  });
});

export const getProfile = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const mongodata = await memberModel.findById(id);

  if (!mongodata) {
    return next(new ServerError("PROFILE_NOT_FOUND", 404));
  }

  res.status(200).json({ isSuccess: true, data: mongodata });
});

export const updateMyProfilePic = AsyncErrorHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);

  const User = await memberModel.findById(decoded.id);

  if (!User) {
    return next(new ServerError("ACCOUNT_NOT_FOUND", 404));
  }

  // Delete old Profile Picture
  if (User.profilePicturePublicId) {
    await DeleteFromCloudinary(User.profilePicturePublicId);
  }

  const uploaded = await UploadBufferToCloudinary(req.file.buffer);

  // Update Database
  User.profilePictureUrl = uploaded.secure_url;
  User.profilePicturePublicId = uploaded.public_id;

  await User.save();

  return res.status(200).json({
    isSuccess: true,
  });
});
