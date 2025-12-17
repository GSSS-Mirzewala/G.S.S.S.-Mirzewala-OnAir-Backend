// External Modules
import jwt from "jsonwebtoken";

export function create(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
}

export function createAndLink(token) {
  return res.cookie("AuthToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Days
  });
}

export function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
