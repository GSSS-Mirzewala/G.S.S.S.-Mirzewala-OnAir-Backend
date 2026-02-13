// Local Modules
import musicModel from "../models/music.model.js";
import AsyncErrorsHandler from "../utils/ServerAsyncErrors.js";

export const getAllMusic = AsyncErrorsHandler(async (req, res, next) => {
  const mongodata = await musicModel.find({}).lean();

  res.status(200).json({
    isSuccess: true,
    data: mongodata,
  });
});
