import type { Request, Response } from "express";
import mongoose from "mongoose";
import z from "zod";
import { User } from "../../models/user.js";

export const getUser = async (req: Request, res: Response) => {
    const schema = z.string();
    const parsedData = schema.safeParse(req.params.userId);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).errors
        });
    }
    const userIdObjectId = new mongoose.Types.ObjectId(parsedData.data);
    const user = await User.findById(userIdObjectId).select("fname lname email phone status userType");
    if (user) {
        return res.json(user);
    }
    res.status(404).json({
        message: "User doesn't exist"
    });
}