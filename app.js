// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Local Module
import PublicRouter from "./routers/PublicRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import HelpRouter from "./routers/HelpRouter.js";
import InternalsRouter from "./routers/InternalsRouter.js";
import ToolsRouter from "./routers/ToolsRouter.js";
import ProfileRouter from "./routers/ProfileRouter.js";
import PostRouter from "./routers/PostRouter.js";

// Models
import "./models/profile/student.model.js";
import "./models/profile/teacher.model.js";
import "./models/profile/admin.model.js";

// Cron Workers
import "./crons/UpdateToOnline.cron.js";

// Creating 'Express' App
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }),
);

// Configurations
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Routers
app.use("/api/public", PublicRouter);
app.use("/api/i", InternalsRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/help", HelpRouter);
app.use("/api/t", ToolsRouter);
app.use("/api/u", ProfileRouter);
app.use("/api/p", PostRouter);

// Error Handler
app.use((err, req, res, next) => {
  // console.error("🔥 ERROR:", err); // (for Debugging)

  res.status(err.statusCode || 500).json({
    isSuccess: false,
    code: err.code || "INTERNAL_SERVER_ERROR",
    meta: err.meta || null,
  });
});

// Start Server & Connect to MongoDb
app.listen(PORT, () => {
  console.log(`✔  App is Running Successfully!`);
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✔  Connected to MongoDb Successfully!");
    })
    .catch((err) => {
      console.log(`❌ Error Occured While Connecting to MongoDb: ${err}`);
    });
});
