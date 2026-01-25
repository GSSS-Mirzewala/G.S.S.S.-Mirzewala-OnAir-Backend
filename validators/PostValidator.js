// External Modules
import { check } from "express-validator";

export const validateContent = [
  check("content")
    .trim()
    .notEmpty()
    .withMessage("POST_CONTENT_REQUIRED")
    .bail()
    .isLength({ max: 10000 })
    .withMessage("INVALID_POST_CONTENT_LENGTH")
    .bail(),
];

export const validateVisibility = [
  check("showTo").trim().notEmpty().withMessage("POST_VISIBILITY_REQUIRED"),
  check("showTo").custom((value, { req }) => {
    const isValid = ["Everyone", "Schoolies", "Staff"]
      .findIndex((val) => value === val)
      .toString();
    if (isValid === "-1") {
      throw new Error("INVALID_POST_VISIBILITY");
    }
    return true;
  }),
];
