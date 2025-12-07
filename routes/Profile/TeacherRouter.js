// External Modules
import express from "express";

// Local Modules
import { getAllStudents } from "../../controllers/Profile/TeacherController.js";

const TeacherRouter = express.Router();

// GET Requests Handling
TeacherRouter.get("/students/class/:class", getAllStudents);

export default TeacherRouter;
