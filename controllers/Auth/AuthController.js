// External Modules
import bcrypt from "bcryptjs";
import Create_JWT from "../../utils/Create_JWT.js";
import { validationResult } from "express-validator";

// Local Modules
import UserModel from "../../models/UserModel.js";

export const handleLogin = async (req, res, next) => {
  const Errors = validationResult(req);

  if (!Errors.isEmpty()) {
    console.log("Error Occured!"); // Debug Point - 1
    console.log(Errors.array());
  } else {
    console.log("Validation Passed Successfully!"); // Debug Point - 2
    const { ustaPin, password } = req.body;

    // Finding User in Database
    const User = await UserModel.findOne({ ustaPin });
    if (!User) {
      throw Error("Invalid Credentials");
    } else {
      console.log("Verifying..."); // Debug Point - 3
      const isPasswordMatched = await bcrypt.compare(password, User.password);
      if (!isPasswordMatched) {
        throw Error("Password doesn't match");
      } else {
        console.log("Password Matched Successfully!"); // Debug Point - 4
        if (User.accountStatus !== "ACTIVE") {
          throw Error(
            "Your Account is Not Active to use. Contact the School Administration for Help."
          );
        } else {
          console.log("Acc. is Still Active to Use!"); // Debug Point - 5
          // Generate JWT Token
          const AuthToken = Create_JWT(User._id);

          // Settingup Cookie
          res.cookie("AuthToken", AuthToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
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
