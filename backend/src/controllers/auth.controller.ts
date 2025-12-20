import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import User from "../models/User";
export const register = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body); 

    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error("REGISTER ERROR:", error.message); 
    res.status(400).json({ message: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

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
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
export const me = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
