// External Modules
import express from "express";

// Local Modules
import { fetchQuote } from "../controllers/Public/QuoteController.js";
import { fetchAllUpdates } from "../controllers/Public/UpdatesController.js";

const PublicRouter = express.Router();

// GET Requests Handling
PublicRouter.get("/quote", fetchQuote);
PublicRouter.get("/updates", fetchAllUpdates);

export default PublicRouter;
