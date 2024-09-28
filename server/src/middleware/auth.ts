// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["x-access-token"] as string;
  if (!token) {
    res.status(403).json({ message: "No token provided!" });
    return res.redirect("/login");
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }
    req.userId = (decoded as DecodedToken).id.toString();
    next();
  });
};

export default verifyToken;
