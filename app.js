// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Loading Enviornments
dotenv.config();

// Creating 'Express' App
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URI, // MUST be loaded from .env
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle Preflight Requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Routers
import AuthRouter from "./routes/Auth/AuthRouter.js";
import HelpRouter from "./routes/Help/HelpRouter.js";

app.use("/api/auth", AuthRouter);
app.use("/api/help", HelpRouter);

// Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✔ Connected to MongoDb Successfully!`);
    app.listen(PORT, () => {
      console.log(`✔ App is Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`❌ Error Occured While Connecting to MongoDb: ${err}`);
  });
