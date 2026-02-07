// External Modules
import cron from "node-cron";

// Local Modules
import MemberModel from "../models/MemberModel.js";

const OFFLINE_THRESHOLD = 2 * 60 * 1000; // 2 Minutes

cron.schedule("*/1 * * * *", async () => {
  try {
    const CUT_OFF = new Date(Date.now() - OFFLINE_THRESHOLD);
    await MemberModel.updateMany(
      {
        isOnline: true,
        lastSeen: { $lt: CUT_OFF },
      },
      { isOnline: false },
    );
  } catch (error) {
    console.log(error);
  }
});
