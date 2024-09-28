"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).json({ message: "No token provided!" });
        return res.redirect("/login");
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Unauthorized!" });
            return;
        }
        req.userId = decoded.id.toString();
        next();
    });
};
exports.default = verifyToken;
