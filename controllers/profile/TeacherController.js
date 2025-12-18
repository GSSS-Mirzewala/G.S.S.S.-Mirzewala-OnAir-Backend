// Local Modules
import MemberModel from "../../models/MemberModel.js";

// Models
import "../../models/profile/StudentModel.js";
import "../../models/profile/TeacherModel.js";
import "../../models/profile/AdminModel.js";

export const getAllStudents = async (req, res) => {
  const { class: className } = req.params;

  try {
    const mongodata = await MemberModel.find({
      userType: "STD",
      accountStatus: "ACTIVE",
      studentRef: { $exists: true, $ne: null },
    })
      .populate({
        path: "studentRef",
        match: { class: className },
        select: "fatherName -_id",
      })
      .select("ustaPin name photoUrl")
      .lean();
    if (mongodata.length !== 0) {
      const filtered = mongodata.filter((item) => item.studentRef !== null);
      return res.status(200).json({ success: true, mongodata: filtered });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Data not Found!" });
    }
  } catch (error) {
    throw new Error(error);
  }
};
