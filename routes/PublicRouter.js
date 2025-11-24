// External Modules
import express from "express";

// Local Modules
import { fetchQuote } from "../controllers/Public/QuoteController.js";

const PublicRouter = express.Router();

// GET Requests Handling
PublicRouter.get("/quote", fetchQuote);

export default PublicRouter;
