// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import MemberModel from "../models/MemberModel.js";
import StudentModel from "../models/profile/StudentModel.js";
import TeacherModel from "../models/profile/TeacherModel.js";
import AdminModel from "../models/profile/AdminModel.js";
import AsyncErrorHandler from "../utils/ServerAsyncErrors.js";
import ServerError from "../utils/ServerErrors.js";

export const getMyInfo = AsyncErrorHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);
  let mongodata = await MemberModel.findById(decoded.id).lean();

  let mongodatax = null;
  if (mongodata.userType === "Student") {
    mongodatax = await StudentModel.findById(mongodata.reference)
      .select("-_id")
      .lean();
  } else if (mongodata.userType === "Teacher") {
    mongodatax = await TeacherModel.findById(mongodata.reference)
      .select("-_id")
      .lean();
  } else if (mongodata.userType === "Admin") {
    mongodatax = await AdminModel.findById(mongodata.reference)
      .select("-_id")
      .lean();
  }

  mongodata = { common: { ...mongodata }, special: { ...mongodatax } };

  if (!mongodata) {
    return next(new ServerError("FAILED_TO_GET_YOU", 500));
  } else {
    return res.status(200).json({
      mongodata,
      success: true,
    });
  }
});

export const getMyProfile = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const mongodata = await MemberModel.findById(id);
  if (!mongodata) {
    return next(new ServerError("USER_NOT_FOUND", 404));
  }

  res.status(200).json({ isSuccess: true, mongodata });
});
