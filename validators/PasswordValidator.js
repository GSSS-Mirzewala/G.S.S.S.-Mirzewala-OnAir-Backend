// External Modules
import { check } from "express-validator";

const PasswordValidator = [
  check("data.password")
    .notEmpty()
    .withMessage("Password should not be Empty!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim()
];

export default PasswordValidator;
