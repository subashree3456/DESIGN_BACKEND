import express from "express";
import {
  getUsers,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getUsers);
export default router;
