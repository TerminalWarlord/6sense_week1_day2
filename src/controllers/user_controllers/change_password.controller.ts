import type { Response } from "express";
import z from "zod";
import mongoose from "mongoose";
import { User } from "../../models/user.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";
import bcrypt from "bcrypt";

export const patchChangePassword = async (req: CustomRequest, res: Response) => {
    const schema = z.object({
        userId: z.string(),
        oldPassword: z.string().min(8).max(100),
        password: z.string().min(8).max(100)
    });
    const parsedData = schema.safeParse({
        ...req.body,
        userId: req.params.userId
    });
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        })
    }
    const {
        password,
        oldPassword,
        userId
    } = parsedData.data;
    const currentUser = await User.findById(req.userId!);
    if (!currentUser || String(currentUser?._id) !== userId) {
        return res.status(403).json({
            message: "You don't have permission to change password for this user"
        })
    }
    try {
        const passwordMatches = await bcrypt.compare(oldPassword, currentUser.password);
        if (!passwordMatches) {
            throw new Error("Old password is incorrect!");
        }
    }
    catch (err) {
        return res.status(403).json({
            message: "Old password is incorrect!",
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        {
            password: hashedPassword,
        }
    );
    res.json({
        message: "Password has been updated"
    })
}