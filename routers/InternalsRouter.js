// External Modules
import express from "express";

// Local Modules
import {
  checkHealth,
  respondHeatBeat,
} from "../controllers/InternalsController.js";
import { protect } from "../middlewares/JWT.js";

const InternalsRouter = express();

// GET Request (Handler)
InternalsRouter.get("/health", checkHealth);
InternalsRouter.post("/heartbeat", [protect], respondHeatBeat);

export default InternalsRouter;
