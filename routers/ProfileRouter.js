// External Modules
import express from "express";

// Local Modules
import upload from "../middlewares/UpdateProfilePicture.js";
import {
  getProfile,
  getMe,
  updateMyProfilePic,
} from "../controllers/ProfileController.js";
import { protect } from "../middlewares/JWT.js";

const ProfileRouter = express.Router();

// GET Requests Handler
ProfileRouter.get("/get/p/me", [protect], getMe);
ProfileRouter.get("/get/p/:id", [protect], getProfile);

// PUT Requests Handler
ProfileRouter.put(
  "/put/p/profilePicture",
  [protect],
  upload.single("profilePicture"),
  updateMyProfilePic,
);

export default ProfileRouter;
