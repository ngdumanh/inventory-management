"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/login", auth_1.login);
router.get("/dashboard", auth_2.default, (req, res) => {
    res.status(200).json({ message: "Welcome to the dashboard!" });
});
router.get("/verify-token", auth_2.default, (req, res) => {
    res.status(200).json({ userId: req.userId });
});
exports.default = router;
