// External Modules
import express from "express";

// Local Modules
import { getAllStudents } from "../../controllers/profile/TeacherController.js";

const TeacherRouter = express.Router();

// GET Requests Handling
TeacherRouter.get("/get/students/class/:class", getAllStudents);

export default TeacherRouter;
