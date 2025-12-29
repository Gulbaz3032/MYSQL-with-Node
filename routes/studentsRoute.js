import { Router } from "express";
import { deleteStudent, getAllStudetns, getStudentById, studentController, updateStudent } from "../controllers/studentControllers.js";

const router = Router();

router.get("/get-all", getAllStudetns);
router.get("/get/:id", getStudentById);
router.post("/create", studentController);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent)

export default router