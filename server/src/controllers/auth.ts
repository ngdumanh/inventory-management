import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

dotenv.config();

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!existingUser) {
      res.status(404).json({ message: "Người dùng không tồn tại" });
      return; // Ensure the function exits if user is not found
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // log
    console.log("isPasswordCorrect", isPasswordCorrect);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Sai mật khẩu" });
      return; // Ensure the function exits if password is incorrect
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    // Create a new object without the password property
    const { password: _, ...userWithoutPassword } = existingUser;

    res.status(200).json({ result: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server src/controllers/auth.ts - Something went wrong",
    });
  }
};
