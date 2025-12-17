// External Modules
import { validationResult } from "express-validator";

// Local Modules
import { create, createAndLink, verify } from "../utils/JWT.js";
import { compare } from "../utils/Hash.js";
import ServerError from "../utils/ServerErrors.js";
import AsyncErrorsHandler from "../utils/ServerAsyncErrors.js";
import MemberModel from "../models/MemberModel.js";

export const handleLogin = AsyncErrorsHandler(async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    return next(new ServerError(Errors.array()[0].msg, 400));
  } else {
    const { ustaPin, password } = req.body.data;

    // Finding User in Database
    let mongodata = await MemberModel.findOne({ ustaPin }).select("+password");
    if (!mongodata) {
      return next(new ServerError("Account Doesn't Exist!", 404));
    } else {
      const isPasswordMatched = compare(password, mongodata.password);
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
          const NewAuthToken = create(mongodata._id);
          createAndLink(NewAuthToken);

          // Sending Final Response
          const User = mongodata.toObject();
          delete User.password;
          return res.status(200).json({
            success: true,
            mongodata: User,
          });
        }
      }
    }
  }
});

export const handleLogout = async (req, res) => {
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
  const decoded = verify(req.cookie.AuthToken);
  let mongodata = await MemberModel.findById(decoded.id)
    .select("userType -_id")
    .lean();

  if (mongodata.userType === "STD") {
    mongodata = await MemberModel.findById(decoded.id)
      .select("-_id -adminRef -teacherRef")
      .populate("studentRef", "-_id");
  } else if (mongodata.userType === "TCH") {
    mongodata = await MemberModel.findById(decoded.id)
      .select("-_id -studentRef -adminRef")
      .populate("teacherRef", "-_id");
  } else if (mongodata.userType === "ADM") {
    mongodata = await MemberModel.findById(decoded.id)
      .select("-_id -adminRef -studentRef")
      .populate("adminRef", "-_id");
  }

  if (!mongodata) {
    return next(new ServerError("Something went wrong!", 500));
  } else {
    return res.status(200).json({
      mongodata,
      success: true,
    });
  }
});
