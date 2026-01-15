// External Modules
import express from "express";

// Local Modules
import { getProfile } from "../controllers/ProfileController.js";

const ProfileRouter = express.Router();

// GET Requests Handler
ProfileRouter.get("/get/p/:id", getProfile);

export default ProfileRouter;
