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
import {
  MiPinValidator,
  PasswordValidator,
} from "../validators/AuthValidator.js";

// Creating Router
const AuthRouter = express.Router();

// GET Requests Handling
AuthRouter.get("/me", [protect], identifyMe);

// POST Requests Handling
AuthRouter.post("/logout", [protect], handleLogout);
AuthRouter.post(
  "/login",
  [redirect, MiPinValidator, PasswordValidator],
  handleLogin
);

export default AuthRouter;
