// External Modules
import express from "express";

// Local Modules
import {
  checkHealth,
  respondHeatBeat,
} from "../controllers/InternalsController.js";

const InternalsRouter = express();

// GET Request (Handler)
InternalsRouter.get("/health", checkHealth);
InternalsRouter.post("/heartbeat", respondHeatBeat);

export default InternalsRouter;
