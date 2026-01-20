// Local Modules
import HelpModel from "../models/HelpModel.js";
import ServerError from "../utils/ServerErrors.js";
import ServerAsyncError from "../utils/ServerAsyncErrors.js";

export const addToDatabase = ServerAsyncError(async (req, res, next) => {
  const { email, concern } = req.body;
  let mongodata = await HelpModel.countDocuments({
    email: email,
    status: "PENDING",
  })

  if (mongodata >= 3) {
    return next(new ServerError('HELP_LIMITS_REACHED', 429));
  }

  mongodata = await HelpModel.countDocuments({
    ip: req.ip,
    status: "PENDING",
  })

  if (mongodata >= 3) {
    return next(new ServerError('HELP_LIMITS_REACHED', 429));
  }

  // If Limits are not Exceeded
  await HelpModel.create({ email, concern, ip: req.ip });

  res.status(201).json({
    success: true,
    message:
      '"Your help request has been submitted! We\'ll get back to you soon!"',
  });
});
