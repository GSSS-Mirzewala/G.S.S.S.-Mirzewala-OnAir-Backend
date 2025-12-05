import HelpModel from "../../models/HelpModel.js";

export const addToDatabase = async (req, res) => {
  const { email, concern } = req.body.data;
  try {
    const mongodata = await HelpModel.find({ email: email }).select("status");
    const PendingRequests = mongodata.filter(
      (Request) => Request.status === "PENDING"
    );

    if (PendingRequests.length >= 3) {
      throw Error("You have already Reached Your Limits!");
    } else {
      const NewHelpRequest = new HelpModel({ email, concern });
      const savemongo = await NewHelpRequest.save();
      if (savemongo) {
        res.status(201).json({
          requestSubmitted: true,
          message: "Help Request Submitted Successfully!",
        });
      } else {
        throw Error("Error while Submitting Help Request!");
      }
    }
  } catch (error) {
    console.error("Database Error", error);
    res.status(500).json({
      requestSubmitted: false,
      message: `Error Occured: ${error.message}`,
    });
  }
};
