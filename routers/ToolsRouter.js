// External Modules
import express from "express";

// Local Modules
import { protect } from "../middlewares/JWT.js";
import { fetchClass, getAllMusic } from "../controllers/ToolsController.js";

const ToolsRouter = express.Router();

// Marker
ToolsRouter.get("/marker/class/:class", [protect], fetchClass);

// Music Player
ToolsRouter.get("/music/get/all", [protect], getAllMusic);

export default ToolsRouter;
