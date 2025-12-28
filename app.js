// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Local Modules
import PublicRouter from "./routes/PublicRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import HelpRouter from "./routes/HelpRouter.js";
import ErrorsHandler from "./middlewares/ServerErrors.js";
import InternalsRouter from "./routes/InternalsRouter.js";

// Profile Based Routers
import TeacherRouter from "./routes/profile/TeacherRouter.js";

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
app.use("/api/u", TeacherRouter);

app.use(ErrorsHandler);

// Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✔  Connected to MongoDb Successfully!");
    app.listen(PORT, () => {
      console.log(`✔  App is Running at localhost:${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(`❌ Error Occured While Connecting to MongoDb: ${err}`);
  });
