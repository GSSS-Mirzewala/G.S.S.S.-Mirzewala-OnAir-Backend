// External Modules
import express from "express";

// Controllers
import { Welcome } from "../controllers/PublicController.js";

// Creating Router
const PublicRouter = express.Router();

// Configuring Routes
PublicRouter.get("/", Welcome);

export default PublicRouter;
