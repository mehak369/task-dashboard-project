import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  res.status(201).json({ message: "User registered" });
};

/* LOGIN */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );


  res.cookie("token", token, {
    httpOnly: true,
    secure: true,       
    sameSite: "none",   
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};


export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.json({ message: "Logged out" });
};


export const me = async (req: any, res: Response) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};
