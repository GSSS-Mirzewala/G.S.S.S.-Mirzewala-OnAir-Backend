// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Local Modules
import PublicRouter from "./routers/PublicRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import HelpRouter from "./routers/HelpRouter.js";
import InternalsRouter from "./routers/InternalsRouter.js";
import ErrorsHandler from "./middlewares/ServerErrors.js";

// Profile Based Routers
import TeacherRouter from "./routers/profile/TeacherRouter.js";

// Loading Enviornments
dotenv.config();

// Creating 'Express' App
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
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
app.use("/api/i", InternalsRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/help", HelpRouter);
app.use("/api/u/t", TeacherRouter);

app.use(ErrorsHandler);

// Start Server & Connect to MongoDb
app.listen(PORT, () => {
  console.log(`✔  App is Running at localhost:${PORT}!`);
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✔  Connected to MongoDb Successfully!");
    })
    .catch((err) => {
      console.log(`❌ Error Occured While Connecting to MongoDb: ${err}`);
    });
});
