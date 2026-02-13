// External Modules
import express from "express";

// Local Modules
import { getAllMusic } from "../controllers/music.controller.js";
import { protect } from "../middlewares/JWT.js";

const MusicRouter = express();

// GET Request (Handler)
MusicRouter.get("/get", [protect], getAllMusic);

export default MusicRouter;
