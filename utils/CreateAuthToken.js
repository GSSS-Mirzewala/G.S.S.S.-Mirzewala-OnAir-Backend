import jwt from "jsonwebtoken";

export default function CreateAuthToken(User_Id) {
  return jwt.sign({ id: User_Id }, process.env.JWT_SECRET);
}
