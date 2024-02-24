import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createtask,
  deletetask,
  gettasks,
  edittask,
  edittaskCompelet,
} from "../controllers/task.controller.js";

const router = express.Router();
router.get("/", gettasks);
router.post("/", verifyToken, createtask);
router.put("/:id", verifyToken, edittask);
router.patch("/:id", verifyToken, edittaskCompelet);
router.delete("/:id", verifyToken, deletetask);
export default router;
