// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import MemberModel from "../models/MemberModel.js";
import ServerError from "../utils/ServerErrors.js";
import AsyncErrorsHandler from "../utils/ServerAsyncErrors.js";

export const checkHealth = (req, res) => {
  res.status(200).json({
    isSuccess: true,
    message: "✔ Server is Running...",
  });
};

export const respondHeatBeat = AsyncErrorsHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new ServerError("NOT_LOGGED_IN", 401));
  }

  const mongodata = await MemberModel.findByIdAndUpdate(
    { _id: decoded.id },
    {
      isOnline: true,
      lastSeen: new Date(),
    },
  );

  if (!mongodata) {
    return next(new ServerError("FAILED_TO_UPDATE_ONLINE", 400));
  }

  res.status(200).json({
    isSuccess: true,
    message: "Connection is Alive!",
  });
});
