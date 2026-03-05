// Local Modules
import catchAsync from "../utils/ServerAsyncErrors.js";
import memberModel from "../models/member.model.js";
import musicModel from "../models/music.model.js";

export const fetchClass = catchAsync(async (req, res) => {
  const { class: className } = req.params;

  const mongodata = await memberModel
    .find({
      userType: "Student",
      accountStatus: "ACTIVE",
    })
    .select("name profilePictureUrl userType reference")
    .populate({
      path: "reference",
      match: { class: className, section: "A" },
      select: "parentName -_id",
    })
    .lean();

  return res.status(200).json({ isSuccess: true, data: mongodata });
});

export const createAtDoc = catchAsync(async (req, res, next) => {
  console.log(req.body);
});

export const getAllMusic = catchAsync(async (req, res, next) => {
  const mongodata = await musicModel.find({}).lean();

  res.status(200).json({
    isSuccess: true,
    data: mongodata,
  });
});
