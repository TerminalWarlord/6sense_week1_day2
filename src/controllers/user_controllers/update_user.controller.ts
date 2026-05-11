import type { Request, Response } from "express";
import z from "zod";
import mongoose from "mongoose";
import { User } from "../../models/user.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";

export const patchUpdateUser = async (req: CustomRequest, res: Response) => {
    const schema = z.object({
        userId: z.string(),
        fname: z.string().max(32).min(3).optional(),
        lname: z.string().max(32).min(3).optional(),
    }).refine((val) => val.fname || val.lname, {
        error: "Any one of the following should be passed: fname, lname!"
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
        userId
    } = parsedData.data;
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    const currentUser = await User.findById(req.userId!);
    if (!currentUser || currentUser._id !== userIdObjectId) {
        return res.status(403).json({
            message: "You don't have permission to update this user"
        })
    }
    await User.updateOne(
        { _id: userIdObjectId },
        {
            fname,
            lname,
        }
    );
    res.json({
        message: "User has been updated"
    })
}