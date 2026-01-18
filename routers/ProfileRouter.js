// External Modules
import express from "express";

// Local Modules
import { getMyProfile, getMyInfo } from "../controllers/ProfileController.js";
import { protect } from "../middlewares/JWT.js";

const ProfileRouter = express.Router();

// GET Requests Handler
ProfileRouter.get("/get/p/me", [protect], getMyInfo);
ProfileRouter.get("/get/p/:id", [protect], getMyProfile);

export default ProfileRouter;
