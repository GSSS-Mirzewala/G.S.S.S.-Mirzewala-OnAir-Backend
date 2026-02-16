// External Modules
import express from "express";

// Local Modules
import { addToDatabase } from "../controllers/help.controller.js";

const HelpRouter = express.Router();

// POST Requests Handling
HelpRouter.post("/submit", addToDatabase);

export default HelpRouter;
