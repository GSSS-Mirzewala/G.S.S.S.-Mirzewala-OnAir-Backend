// External Modules
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Local Modules
import ServerError from "../utils/ServerErrors.js";
import AsyncErrorsHandler from "../utils/ServerAsyncErrors.js";
import MemberModel from "../models/MemberModel.js";

import StudentModel from "../models/profile/StudentModel.js";
import TeacherModel from "../models/profile/TeacherModel.js";
import AdminModel from "../models/profile/AdminModel.js";

export const handleLogin = AsyncErrorsHandler(async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    return next(new ServerError(Errors.array()[0].msg, 400));
  } else {
    const { miPin, password } = req.body;

    // Finding User in Database
    let mongodata = await MemberModel.findOne({ miPin }).select("+password");
    if (!mongodata) {
      return next(new ServerError("Account Doesn't Exist!", 404));
    } else {
      const isPasswordMatched = bcrypt.compareSync(
        password,
        mongodata.password
      );
      if (!isPasswordMatched) {
        return next(new ServerError("Incorrect Password!", 401));
      } else {
        if (mongodata.accountStatus !== "ACTIVE") {
          return next(
            new ServerError(
              "Your Account is Not Active to use. Contact the School Administration for Help.",
              403
            )
          );
        } else {
          const NewAuthToken = jwt.sign(
            { id: mongodata._id, userType: mongodata.userType },
            process.env.JWT_SECRET
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
    }
  );

  if (!mongodata) {
    return next(
      new ServerError("Failed to Update Online Status!", "UPDATE_ONLINE_FAILED")
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

export const identifyMe = AsyncErrorsHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);
  let mongodata = await MemberModel.findById(decoded.id).select("-_id").lean();

  let mongodatax = null;
  if (mongodata.userType === "Student") {
    mongodatax = await StudentModel.findById(mongodata.reference)
      .select("-_id")
      .lean();
  } else if (mongodata.userType === "Teacher") {
    mongodatax = await TeacherModel.findById(mongodata.reference)
      .select("-_id")
      .lean();
  } else if (mongodata.userType === "Admin") {
    mongodatax = await AdminModel.findById(mongodata.reference)
      .select("-_id")
      .lean();
  }

  mongodata = { common: { ...mongodata }, special: { ...mongodatax } };

  if (!mongodata) {
    return next(new ServerError("Cannot Get You!", 500));
  } else {
    return res.status(200).json({
      mongodata,
      success: true,
    });
  }
});
