// External Modules
import express from "express";

// Local Modules
import { create } from "../controllers/PostController.js";
import {
  validateContent,
  validateVisibility,
} from "../validators/PostValidator.js";
import { protect } from "../middlewares/JWT.js";

const PostRouter = express.Router();

// POST Requests Handlers
PostRouter.post(
  "/create",
  [protect, validateContent, validateVisibility],
  create,
);

export default PostRouter;
