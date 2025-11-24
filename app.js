// External Modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoDBStoreFactory from "connect-mongodb-session";

// Routers
import PublicRouter from "./routes/PublicRouter.js";
import AuthRouter from "./routes/Auth/AuthRouter.js";
import HelpRouter from "./routes/Help/HelpRouter.js";

// Creating 'Express' App
const app = express();

// Configurations
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URI, // Frontend URL
    credentials: true,
  })
);
dotenv.config();

// Encoding Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// MongoDb for Saving Sessions
const MongoDBStore = MongoDBStoreFactory(session);
const Mongo_DB_Store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

// Session Middleware
app.use(
  session({
    secret: "@gsssmirzewala1954", // Temp.
    resave: false,
    saveUninitialized: false,
    store: Mongo_DB_Store, // Store Sessions in MongoDb Store
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      rolling: true, // Reset Expiring time after relogin
    },
  })
);

// Routing
app.use("/api/auth", AuthRouter);
app.use("/api/help", HelpRouter);

// Making App Listen
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✔  Connected to MongoDb Successfully!`);
    app.listen(PORT, () => {
      console.log(`✔  App is Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`❌ Error Occured! while Connecting to MongoDb: ${err}`);
  });
