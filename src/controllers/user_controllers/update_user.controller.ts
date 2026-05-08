import type { Request, Response } from "express";
import z from "zod";
import mongoose from "mongoose";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";

export const patchUpdateUser = async (req: Request, res: Response) => {
    const schema = z.object({
        userId: z.string(),
        fname: z.string().max(32).min(3).optional(),
        lname: z.string().max(32).min(3).optional(),
        password: z.string().min(8).max(100).optional()
    }).refine((val) => val.fname || val.lname || val.password, {
        error: "Any one of the following should be passed: fname, lname, password!"
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
        fname,
        lname,
        password,
        userId
    } = parsedData.data;
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    let updatedPassword;
    if (password) {
        updatedPassword = await bcrypt.hash(password, 5);
    }
    await User.updateOne(
        { _id: userIdObjectId },
        {
            fname,
            lname,
            password: updatedPassword
        }
    );
    res.json({
        message: "User has been updated"
    })
}