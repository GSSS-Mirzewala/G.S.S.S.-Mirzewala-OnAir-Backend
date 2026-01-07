// External Modules
import { check } from "express-validator";

export const MiPinValidator = [
  check("data.miPin")
    .trim()
    .notEmpty()
    .withMessage("MI_PIN_REQUIRED")
    .bail()
    .toUpperCase()
    .isLength({ min: 11, max: 11 })
    .withMessage("INVALID_MI_PIN_LENGTH")
    .bail()
    .matches(/^@(STD|TCH|ADM)\d{4}[A-Z]{3}$/) // Fixed Patter e.g. @STD1001ABC
    .withMessage("INVALID_MI_PIN_PATTERN")
    .bail()
    .not()
    .matches(/\s/)
    .withMessage("MI_PIN_SPACES_NOT_ALLOWED")
    .bail()
    .not()
    .matches(/[\u{1F600}-\u{1F64F}]/u)
    .withMessage("MI_PIN_EMOJI_NOT_ALLOWED")
    .bail(),
];

export const PasswordValidator = [
  check("data.password")
    .trim()
    .notEmpty()
    .withMessage("PASSWORD_REQUIRED")
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage("INVALID_PASSWORD_LENGTH")
    .bail()
    .matches(/[a-zA-Z]/)
    .withMessage("PASSWORD_REQUIRED_LETTERS")
    .bail()
    .matches(/[0-9]/)
    .withMessage("PASSWORD_REQUIRED_NUMBERS")
    .bail()
    .not()
    .matches(/\s/)
    .withMessage("PASSWORD_SPACES_NOT_ALLOWED")
    .bail()
    .not()
    .matches(/[\u{1F600}-\u{1F64F}]/u)
    .withMessage("PASSWORD_EMOJI_NOT_ALLOWED")
    .bail(),
  ,
];
