import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    (req as any).userId = decoded.userId;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
