// External Modules
import { check } from "express-validator";

const MI_PIN_Validator = [
  check("data.miPin")
    .trim()
    .notEmpty()
    .withMessage("MI PIN is Required!")
    .withMessage("MI PIN cannot be longer than 11 characters.")
    .matches(/^@(STD|TCH|ADM)\d{4}[A-Z]{3}$/) // Fixed Patter e.g. @STD1001ABC
    .withMessage("MI PIN follows a fixed Pattern."),
];

export default MI_PIN_Validator;
