import MemberModel from "../../models/MemberModel.js";

// Models
import "../../models/Profile/StudentModel.js";
import "../../models/Profile/TeacherModel.js";
import "../../models/Profile/AdminModel.js";

export const getAllStudents = async (req, res) => {
  const { class: className } = req.params;

  try {
    const mongodata = await MemberModel.find({
      userType: "STD",
      accountStatus: "ACTIVE",
      studentRef: { $ne: null },
    })
      .populate({
        path: "studentRef",
        match: { class: className },
        select: "fatherName -_id",
      })
      .select("ustaPin name photoUrl -_id")
      .lean();
    res.status(200).json(...mongodata);
  } catch (error) {
    throw new Error(error);
  }
};
