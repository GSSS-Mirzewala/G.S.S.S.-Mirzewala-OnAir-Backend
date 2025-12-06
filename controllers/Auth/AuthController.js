// External Modules
import bcrypt from "bcryptjs";
import Create_JWT from "../../utils/Create_JWT.js";
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
          const AuthToken = Create_JWT(mongodata._id); // Generate JWT Token

          // Settingup Cookie
          res.cookie("AuthToken", AuthToken, {
            httpOnly: true,
            secure: true, // True for Production & False for Local Development
            sameSite: "none", // "none" for Production & "lax" for Local Development
            path: "/",
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
  res.end();
};

export const identifyMe = async (req, res) => {
  const UserToken = req.cookies.AuthToken;
  console.log(UserToken);
};
