// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Local Modules (Routers)
import PublicRouter from "./routes/PublicRouter.js";
import AuthRouter from "./routes/Auth/AuthRouter.js";
import HelpRouter from "./routes/Help/HelpRouter.js";

// Loading Enviornments
dotenv.config();

// Creating 'Express' App
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URI, // MUST be loaded from .env
    credentials: true,
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Routers
app.use("/api/public", PublicRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/help", HelpRouter);

// Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✔  Connected to MongoDb Successfully!`);
    app.listen(PORT, () => {
      console.log(`✔  App is Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`❌ Error Occured While Connecting to MongoDb: ${err}`);
  });
