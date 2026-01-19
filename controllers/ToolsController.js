// Local Modules
import AsyncErrorHandler from "../utils/ServerAsyncErrors.js";
import MemberModel from "../models/MemberModel.js";
import StudentModel from "../models/profile/StudentModel.js";

export const fetchClass = AsyncErrorHandler(async (req, res) => {
  const { class: className } = req.params;

  const members = await MemberModel.find({
    userType: "Student",
    accountStatus: "ACTIVE",
  })
    .select("name avatarUrl reference")
    .lean();

  if (!members.length) {
    return res
      .status(404)
      .json({ success: false, message: "No students found" });
  }

  const refIds = members.map((m) => m.reference);

  const profiles = await StudentModel.find({
    _id: { $in: refIds },
    class: className,
  })
    .select("fatherName class") // add more fields if needed
    .lean();

  const profileMap = new Map(profiles.map((p) => [String(p._id), p]));

  // ⬇️ Spread profile fields into the parent object
  const filtered = members
    .map((m) => {
      const profile = profileMap.get(String(m.reference));
      return profile
        ? { ...m, ...profile } // <-- merged flat structure
        : null;
    })
    .filter(Boolean);

  if (!filtered.length) {
    return res.status(404).json({ success: false, message: "Data not Found!" });
  }

  return res.status(200).json({ success: true, mongodata: filtered });
});
