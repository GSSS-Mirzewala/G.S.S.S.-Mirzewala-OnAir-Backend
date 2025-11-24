// External Modules
import express from "express";

// Controllers
import { handleLogin } from "../../controllers/Auth/AuthController.js";

// Validators
import USTA_PIN_Validator from "../../validators/USTA_PIN_Validator.js";
import PasswordValidator from "../../validators/PasswordValidator.js";

// Creating Router
const AuthRouter = express.Router();

// Configuring Post Routes
AuthRouter.post("/login", [USTA_PIN_Validator, PasswordValidator], handleLogin);

export default AuthRouter;
