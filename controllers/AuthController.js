// External Modules
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Local Modules
import ServerError from "../utils/ServerErrors.js";
import AsyncErrorsHandler from "../utils/ServerAsyncErrors.js";
import MemberModel from "../models/MemberModel.js";

export const handleLogin = AsyncErrorsHandler(async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    return next(new ServerError(Errors.array()[0].msg, 400));
  } else {
    const { miPin, password } = req.body;

    // Finding User in Database
    let mongodata = await MemberModel.findOne({ miPin }).select("+password");
    if (!mongodata) {
      return next(new ServerError("ACCOUNT_NOT_FOUND", 404));
    } else {
      const isPasswordMatched = bcrypt.compareSync(
        password,
        mongodata.password,
      );
      if (!isPasswordMatched) {
        return next(new ServerError("WRONG_PASSWORD", 401));
      } else {
        if (mongodata.accountStatus !== "ACTIVE") {
          return next(new ServerError( "ACCOUNT_NOT_ACTIVE", 403));
        } else {
          const NewAuthToken = jwt.sign(
            { id: mongodata._id, userType: mongodata.userType },
            process.env.JWT_SECRET,
          );

          res.cookie("AuthToken", NewAuthToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Days
          });

          // Sending Final Response
          const User = mongodata.toObject();
          delete User.password;
          return res.status(200).json({
            success: true,
            mongodata: { common: User },
          });
        }
      }
    }
  }
});

export const handleLogout = async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);

  const mongodata = await MemberModel.findByIdAndUpdate(
    { _id: decoded.id },
    {
      isOnline: false,
      lastSeen: new Date(),
    },
  );

  if (!mongodata) {
    return next(
      new ServerError(
        "FAILED_TO_UPDATE_ONLINE", 409
      ),
    );
  }

  res.clearCookie("AuthToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
