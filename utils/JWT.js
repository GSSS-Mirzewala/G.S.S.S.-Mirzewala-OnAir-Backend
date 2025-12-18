// External Modules
import jwt from "jsonwebtoken";

export function create(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
}

export function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
