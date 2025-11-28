import UpdatesModel from "../../models/UpdatesModel.js";

export const fetchAllUpdates = async (req, res) => {
  try {
    const ReleaseNotes = await UpdatesModel.find();
    res.status(200).json({
      ReleaseNotes,
    });
  } catch (error) {
    throw new Error(error);
  }
};
