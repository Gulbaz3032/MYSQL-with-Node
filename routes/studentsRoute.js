import { Router } from "express";
import { getAllStudetns, getStudentById, studentController } from "../controllers/studentControllers.js";

const router = Router();

router.get("/get-all", getAllStudetns);
router.get("/get/:id", getStudentById);
router.post("/create", studentController)

export default router