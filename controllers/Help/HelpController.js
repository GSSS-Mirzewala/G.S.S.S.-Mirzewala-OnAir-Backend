import HelpModel from "../../models/HelpModel.js";

export const addToDatabase = async (req, res) => {
  const { email, concern } = req.body;
  try {
    const NewHelpRequest = new HelpModel({ email, concern });
    const isSaved = await NewHelpRequest.save();
    if (isSaved) {
      res.status(201).json({
        requestSubmitted: true,
        message: "Help Request Submitted Successfully!",
      });
    } else {
      throw Error("Error while Submitting Help Request!");
    }
  } catch (error) {
    console.error("Database Error");
    res.status(500).json({
      requestSubmitted: false,
      message: `Error Occured: ${error}`,
    });
  }
};
