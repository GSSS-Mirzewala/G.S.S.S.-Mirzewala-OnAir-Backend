// Local Modules
import ServerAsyncError from "../../utils/ServerAsyncErrors.js";
import MemberModel from "../../models/MemberModel.js";
import StudentModel from "../../models/profile/StudentModel.js";

export const fetchClass = ServerAsyncError(async (req, res) => {
  const { class: className } = req.params;

  let mongodata = await MemberModel.find({
    userType: "Student",
    accountStatus: "ACTIVE",
  })
    .select("name photoUrl reference")
    .lean();

  const mongodatax = StudentModel.find({
    _id: mongodata.reference,
    class: className,
  })
    .select("fatherName -_id")
    .lean();

  mongodata = { ...mongodata, mongodatax };
  if (mongodata.length !== 0) {
    return res.status(200).json({ success: true, mongodata: filtered });
  } else {
    return res.status(404).json({ success: false, message: "Data not Found!" });
  }
});
