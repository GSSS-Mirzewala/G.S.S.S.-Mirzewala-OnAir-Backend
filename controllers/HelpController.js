// Local Modules
import helpModel from "../models/help.model.js";
import ServerError from "../utils/ServerErrors.js";
import ServerAsyncError from "../utils/ServerAsyncErrors.js";

export const addToDatabase = ServerAsyncError(async (req, res, next) => {
  const { email, concern } = req.body;

  const pendingRequests = await helpModel.countDocuments({
    status: "PENDING",
    $or: [{ email: email }, { ip: req.ip }],
  });

  if (pendingRequests >= 3) {
    return next(new ServerError("HELP_LIMITS_REACHED", 429));
  }

  // If Limits are not Exceeded
  await helpModel.create({ email, concern, ip: req.ip });

  res.status(201).json({
    isSuccess: true,
    message:
      '"Your help request has been submitted! We\'ll get back to you soon!"',
  });
});
