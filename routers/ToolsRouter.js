// External Modules
import express from "express";

// Local Modules
import { fetchClass } from "../controllers/ToolsController.js";

const ToolsRouter = express.Router();

// GET Requests Handling
ToolsRouter.get("/marker/class/:class", fetchClass);

export default ToolsRouter;
