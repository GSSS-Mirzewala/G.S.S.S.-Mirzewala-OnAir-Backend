// External Modules
import express from "express";

// Local Modules
import { fetchQuote } from "../controllers/public/QuoteController.js";
import { fetchAllUpdates } from "../controllers/public/UpdatesController.js";
import { fetchLatestUpdate } from "../controllers/public/UpdatesController.js";

const PublicRouter = express.Router();

// GET Requests Handling
PublicRouter.get("/quote", fetchQuote);
PublicRouter.get("/updates", fetchAllUpdates);
PublicRouter.get("/latestupdate", fetchLatestUpdate);

export default PublicRouter;
