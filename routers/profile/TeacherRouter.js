// External Modules
import express from "express";

// Local Modules
import { fetchClass } from "../../controllers/profile/TeacherController.js";

const TeacherRouter = express.Router();

// GET Requests Handling
TeacherRouter.get("/class/:class", fetchClass);

export default TeacherRouter;
