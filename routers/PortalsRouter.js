// External Modules
import express from "express";

// Local Modules
import { createAccount } from "../controllers/PortalsController.js";

const PortalsRouter = express.Router();

// Handling GET Requests
PortalsRouter.post("/auth/create", createAccount);

export default PortalsRouter;
