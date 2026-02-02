// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import ServerError from "../utils/ServerErrors.js";

export function protect(req, res, next) {
  if (!req.cookies.AuthToken) {
    return next(new ServerError("NOT_LOGGED_IN", 401));
  } else {
    const decoded = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new ServerError("NOT_LOGGED_IN", 401));
    } else {
      next();
    }
  }
}

export function redirect(req, res, next) {
  if (req.cookies.AuthToken) {
    return next(new ServerError("CANNOT_ACCESS_PAGE!", 401));
  } else {
    next();
  }
}
