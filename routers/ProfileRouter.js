// External Modules
import express from "express";

// Local Modules
import upload from "../middlewares/UpdateAvatar.js";
import {
  getProfile,
  getMe,
  updateMyAvatar,
} from "../controllers/ProfileController.js";
import { protect } from "../middlewares/JWT.js";

const ProfileRouter = express.Router();

// GET Requests Handler
ProfileRouter.get("/get/p/me", [protect], getMe);
ProfileRouter.get("/get/p/:id", [protect], getProfile);

// PUT Requests Handler
ProfileRouter.put(
  "/put/p/avatar",
  [protect],
  upload.single("avatar"),
  updateMyAvatar,
);

export default ProfileRouter;
