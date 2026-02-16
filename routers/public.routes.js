// External Modules
import express from "express";

// Local Modules
import { fetchQuote } from "../controllers/public.controller.js";
import { fetchAllUpdates } from "../controllers/public.controller.js";
import { fetchLatestUpdate } from "../controllers/public.controller.js";

const PublicRouter = express.Router();

// GET Requests Handling
PublicRouter.get("/quote", fetchQuote);
PublicRouter.get("/updates", fetchAllUpdates);
PublicRouter.get("/latestupdate", fetchLatestUpdate);

export default PublicRouter;
