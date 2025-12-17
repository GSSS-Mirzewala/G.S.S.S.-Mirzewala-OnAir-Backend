// Local Modules
import { verify } from "../utils/JWT.js";
import ServerError from "../utils/ServerErrors.js";

export function protect(req, res, next) {
  if (!req.cookies.AuthToken) {
    return next(new ServerError("You are Not Loggedin!", 401));
  } else {
    const decoded = verify(req.cookies.AuthToken, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new ServerError("You are Not Loggedin!", 401));
    } else {
      next();
    }
  }
}

export function redirect(req, res, next) {
  if (req.cookies.AuthToken) {
    return next(new ServerError("Cannot access this Page!", 401));
  } else {
    next();
  }
}
