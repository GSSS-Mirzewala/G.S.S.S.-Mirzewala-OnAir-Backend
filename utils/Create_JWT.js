import jwt from "jsonwebtoken";

const Create_JWT = (User_Id) => {
  return jwt.sign({ id: User_Id }, process.env.JWT_SECRET);
};

export default Create_JWT;
