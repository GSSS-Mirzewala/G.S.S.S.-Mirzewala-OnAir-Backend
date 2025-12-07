// External Modules
import bcrypt from "bcryptjs";
import CreateAuthToken from "../../utils/CreateAuthToken.js";
import VerifyAuthToken from "../../utils/VerifyAuthToken.js";
import { validationResult } from "express-validator";

// Local Modules
import MemberModel from "../../models/MemberModel.js";

export const handleLogin = async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    console.log(Errors.array());
  } else {
    console.log("Validation Passed Successfully!");
    const { ustaPin, password } = req.body.data;

    // Finding User in Database
    const mongodata = await MemberModel.findOne({ ustaPin });
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
          const AuthToken = CreateAuthToken(mongodata._id); // Generate JWT Token

          // Settingup Cookie
          res.cookie("AuthToken", AuthToken, {
            secure: true, // Cookie only sent on HTTPS
            sameSite: "none", // Required when frontend & backend have different domains
            domain: ".gsssmirzewala.in", // Allow cookie across subdomains
            path: "/", // Allow cookie for all routes
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          });

          // Sending Final Response
          return res.status(200).json({
            loggedIn: true,
            message: "You are Loggedin Successfully!",
            mongodata,
          });
        }
      }
    }
  }
  return res.end();
};

export const identifyMe = async (req, res) => {
  const UserToken = req.cookies.AuthToken;
  if (!UserToken) {
    return res.status(401).json({
      loggedIn: false,
      message: "No token found",
    });
  } else {
    if (!VerifyAuthToken(UserToken)) {
      return res.status(200).json({
        loggedIn: false,
        message: "Invalid Json Web Token!",
      });
    } else {
      return res.status(200).json({
        loggedIn: true,
        message: "Token Found!",
      });
    }
  }
};
