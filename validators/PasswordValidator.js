// External Modules
import { check } from "express-validator";

const PasswordValidator = [
  check("data.password")
    .notEmpty()
    .withMessage("Password should not be Empty!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least 1 lowercase character.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 Uppercase character.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least 1 Numeric character.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least 1 Special character."),
];

export default PasswordValidator;
