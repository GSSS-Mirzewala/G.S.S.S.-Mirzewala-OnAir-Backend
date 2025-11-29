import UpdatesModel from "../../models/UpdatesModel.js";

export const fetchAllUpdates = async (req, res) => {
  try {
    const mongodata = await UpdatesModel.find();
    res.status(200).json({
      mongodata,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchLatestUpdate = async (req, res) => {
  try {
    const mongodata = await UpdatesModel.findOne().sort({ createdAt: -1 });
    res.status(200).json({
      mongodata,
    });
  } catch (error) {
    throw new Error(error);
  }
};
