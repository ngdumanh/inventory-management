// src/routes/auth.ts
import express from "express";
import { login } from "../controllers/auth";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/login", login);

router.get("/about", (req, res) => {
  res.status(200).json({ message: "ABOUT" });
});
router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard!" });
});
router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ userId: req.userId });
});

export default router;
