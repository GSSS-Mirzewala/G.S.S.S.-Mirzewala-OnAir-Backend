// External Modules
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

// Local Modules
import PostModel from "../models/PostModel.js";
import ServerError from "../utils/ServerErrors.js";
import AsyncServerHandler from "../utils/ServerAsyncErrors.js";

export const create = AsyncServerHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      errors: errors.array(),
    });
  }

  const mongod = await PostModel.create({
    content: req.body.content,
    showTo: req.body.showTo,
    posterId: new mongoose.Types.ObjectId(decoded),
  });

  if (!mongod) {
    return next(new ServerError("POST_CREATION_FAILED", 400));
  }

  return res.status(201).json({
    isSuccess: true,
    message: "Post created Successfully!",
  });
});
