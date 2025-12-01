// External Modules
import bcrypt from "bcryptjs";
import Create_JWT from "../../utils/Create_JWT.js";
import { validationResult } from "express-validator";

// Local Modules
import UserModel from "../../models/UserModel.js";

export const handleLogin = async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    console.log(Errors.array());
  } else {
    console.log("Validation Passed Successfully!");
    const { ustaPin, password } = req.body.data;

    // Finding User in Database
    const User = await UserModel.findOne({ ustaPin });
    if (!User) {
      throw Error("Invalid Credentials");
    } else {
      console.log("Verifying...");
      const isPasswordMatched = await bcrypt.compare(password, User.password);
      if (!isPasswordMatched) {
        throw Error("Password doesn't match");
      } else {
        console.log("Password Matched Successfully!");

        if (User.accountStatus !== "ACTIVE") {
          throw Error(
            "Your Account is Not Active to use. Contact the School Administration for Help."
          );
        } else {
          console.log("Acc. is Still Active to Use!");
          const AuthToken = Create_JWT(User._id); // Generate JWT Token

          // Settingup Cookie
          res.cookie("AuthToken", AuthToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });

          // Sending Final Response
          return res.status(200).json({
            loggedIn: true,
            message: "You are Loggedin Successfully!",
            User,
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
