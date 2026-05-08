import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type mongoose from "mongoose";
import { User } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface CustomRequest extends Request {
    userId?: mongoose.Types.ObjectId
}
export const adminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!authorization || !authorization.includes("Bearer ") || !token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: mongoose.Types.ObjectId };
    const user = await User.findById(decodedToken.userId);
    if (!user || user.userType !== "admin") {
        return res.status(403).json({
            message: "You don't have sufficient permission"
        });
    }
    req.userId = user._id;
    next();
}