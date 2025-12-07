import jwt from "jsonwebtoken";

export default function VerifyAuthToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
