// External Modules
import express from "express";

// Local Modules
import {
  handleLogin,
  handleLogout,
  identifyMe,
} from "../controllers/AuthController.js";
import { redirect, protect } from "../middlewares/JWT.js";

// Validators
import USTA_PIN_Validator from "../validators/USTA_PIN_Validator.js";
import PasswordValidator from "../validators/PasswordValidator.js";

// Creating Router
const AuthRouter = express.Router();

// GET Requests Handling
AuthRouter.get("/me", [protect], identifyMe);

// POST Requests Handling
AuthRouter.post("/logout", [protect], handleLogout);
AuthRouter.post(
  "/login",
  [redirect, USTA_PIN_Validator, PasswordValidator],
  handleLogin
);

export default AuthRouter;
