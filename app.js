// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Local Modules
import PublicRoutes from "./routers/public.routes.js";
import AuthRoutes from "./routers/auth.routes.js";
import HelpRoutes from "./routers/help.routes.js";
import InternalsRoutes from "./routers/internals.routes.js";
import ToolsRoutes from "./routers/tools.routes.js";
import ProfileRoutes from "./routers/profile.routes.js";
import PostRoutes from "./routers/post.routes.js";

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
app.use("/api/public", PublicRoutes);
app.use("/api/i", InternalsRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/help", HelpRoutes);
app.use("/api/t", ToolsRoutes);
app.use("/api/u", ProfileRoutes);
app.use("/api/p", PostRoutes);

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
