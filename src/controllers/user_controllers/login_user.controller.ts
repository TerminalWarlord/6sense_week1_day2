import type { Request, Response } from "express";
import z from "zod";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const postLoginUser = async (req: Request, res: Response) => {
    const schema = z.object({
        email: z.string(),
        password: z.string(),
    });

    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(500).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        })
    }
    const {
        email,
        password
    } = parsedData.data;
    const user = await User.findOne({
        email,
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({
            token,
            message: "Login successful",
        });
    }
    res.status(403).json({
        message: "Password is incorrect"
    })
}