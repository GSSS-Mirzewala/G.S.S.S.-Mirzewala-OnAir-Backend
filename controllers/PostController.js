// External Modules
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

// Local Modules
import PostModel from "../models/PostModel.js";
import MemberModel from "../models/MemberModel.js";
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

  await PostModel.create({
    content: req.body.content,
    showTo: req.body.showTo,
    poster: new mongoose.Types.ObjectId(decoded),
  });

  return res.status(201).json({
    isSuccess: true,
    message: "Post created Successfully!",
  });
});

export const fetch = AsyncServerHandler(async (req, res, next) => {
  const mongodata = await PostModel.find({})
    .populate("poster")
    .sort({ _id: -1 })
    .limit(10)
    .lean();

  res.status(200).json({
    isSuccess: true,
    data: mongodata,
  });
});
