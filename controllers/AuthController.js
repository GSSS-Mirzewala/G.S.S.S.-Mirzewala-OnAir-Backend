// External Modules
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Local Modules
import { create, verify } from "../utils/JWT.js";
import MemberModel from "../models/MemberModel.js";

export const handleLogin = async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    console.log(Errors.array());
  } else {
    console.log("Validation Passed Successfully!");
    const { ustaPin, password } = req.body.data;

    // Finding User in Database
    const mongodata = await MemberModel.findOne({ ustaPin }).select("+password");
    if (!mongodata) {
      throw Error("Invalid Credentials");
    } else {
      console.log("Verifying...");
      const isPasswordMatched = await bcrypt.compare(
        password,
        mongodata.password
      );
      if (!isPasswordMatched) {
        throw Error("Password doesn't match");
      } else {
        console.log("Password Matched Successfully!");

        if (mongodata.accountStatus !== "ACTIVE") {
          throw Error(
            "Your Account is Not Active to use. Contact the School Administration for Help."
          );
        } else {
          console.log("Acc. is Still Active to Use!");
          const AuthToken = create(mongodata._id); // Generate JWT Token

          // Settingup Cookie
          res.cookie("AuthToken", AuthToken, {
            httpOnly: true,
            secure: true, // Cookie only sent on HTTPS
            sameSite: "none", // Required when frontend & backend have different domains
            path: "/", // Allow cookie for all routes
            maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Days
          });

          // Sending Final Response
          return res.status(200).json({
            success: true,
            message: "You are Loggedin Successfully!",
            mongodata,
          });
        }
      }
    }
  }
  return res.end();
};

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

export const identifyMe = async (req, res) => {
  const UserToken = req.cookies.AuthToken;
  if (!UserToken) {
    return res.status(401).json({
      success: false,
      message: "No token found",
    });
  } else {
    const decoded = verify(UserToken);
    if (!decoded) {
      return res.status(200).json({
        success: false,
        message: "Invalid Json Web Token!",
      });
    } else {
      try {
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

        return res.status(200).json({
          mongodata,
          success: true,
          message: "Token Found!",
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
