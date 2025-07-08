import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request with custom property
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Define custom JWT payload interface
interface JwtPayloadCustom extends JwtPayload {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers);
    
    const token = req.headers["token"];

    // Ensure token is a string
    if (!token || typeof token !== "string") {
      return res
        .status(401)
        .json({ message: "Token not provided", success: false });
    }

    // Verify token and cast safely
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadCustom;

    // Validate payload
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ message: "Invalid token payload", success: false });
    }

    // Attach user ID to request
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
