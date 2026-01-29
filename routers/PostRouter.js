// External Modules
import express from "express";

// Local Modules
import {
  create,
  fetchForEveryone,
  fetchForSchoolies,
  fetchForStaff,
} from "../controllers/PostController.js";
import {
  validateContent,
  validateVisibility,
} from "../validators/PostValidator.js";
import { protect } from "../middlewares/JWT.js";

const PostRouter = express.Router();

// GET Requests Handlers
PostRouter.get("/fetch/everyone", fetchForEveryone);
PostRouter.get("/fetch/staff", [protect], fetchForStaff);
PostRouter.get("/fetch/schoolies", [protect], fetchForSchoolies);

// POST Requests Handlers
PostRouter.post(
  "/create",
  [protect, validateContent, validateVisibility],
  create,
);

export default PostRouter;
