// External Modules
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

// Local Modules
import postModel from "../models/post.model.js";
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

  await postModel.create({
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
  let showFor = ["Everyone", "Everyone", "Everyone"];
  if (req.cookies.AuthToken) {
    const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);
    showFor[1] = "Schoolies";
    if (decoded.userType === "Teacher" || decoded.userType === "Admin") {
      showFor[2] = "Staff";
    }
  }

  const mongodata = await postModel
    .find({
      $or: [
        { showTo: showFor[0] },
        { showTo: showFor[1] },
        { showTo: showFor[2] },
      ],
    })
    .populate("poster")
    .sort({ _id: -1 })
    .limit(10)
    .lean();

  res.status(200).json({
    isSuccess: true,
    data: mongodata,
  });
});
