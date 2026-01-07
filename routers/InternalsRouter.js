// External Modules
import express from "express";

// Local Modules
import { checkHealth } from "../controllers/InternalsController.js";

const InternalsRouter = express();

// GET Request (Handler)
InternalsRouter.get("/health", checkHealth);

export default InternalsRouter;
