// External Modules
import { check } from "express-validator";

const USTA_PIN_Validator = [
  check("data.ustaPin")
    .trim()
    .notEmpty()
    .withMessage("USTA PIN is Required!")
    .withMessage("USTA PIN cannot be longer than 11 characters.")
    .matches(/^@(STD|TCH|ADM)\d{4}[A-Z]{3}$/) // Fixed Patter e.g. @STD1001ABC
    .withMessage("USTA PIN follows a fixed Pattern."),
];

export default USTA_PIN_Validator;
