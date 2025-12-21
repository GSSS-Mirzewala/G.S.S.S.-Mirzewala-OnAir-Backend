// Local Modules
import HelpModel from "../models/HelpModel.js";
import ServerError from "../utils/ServerErrors.js";
import ServerAsyncError from "../utils/ServerAsyncErrors.js";

export const addToDatabase = ServerAsyncError(async (req, res, next) => {
  const { email, concern } = req.body.data;
  const mongodata = await HelpModel.countDocuments({
    email: email,
    status: "PENDING",
  }).select("status");

  if (mongodata >= 3) {
    return next(new ServerError("You have Reached Your Limits!", 429));
  }

  // If Limits are not Exceeded
  await HelpModel.create({ email, concern });

  res.status(201).json({
    success: true,
    message:
      '"Your help request has been submitted! We\'ll get back to you soon!"',
  });
});
