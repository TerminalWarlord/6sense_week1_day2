import type { Request, Response } from "express";
import z from "zod";
import { User } from "../../models/user.js";

export const getUsers = async (req: Request, res: Response) => {
    const schema = z.object({
        limit: z.coerce.number().max(10).min(1).default(10),
        offset: z.coerce.number().min(0).default(0),
    });
    const parsedData = schema.safeParse({
        limit: req.query.limit,
        offset: req.query.offset,
    });
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).errors
        });
    }
    const {
        limit,
        offset
    } = parsedData.data;
    const users = await User.find()
        .skip(offset)
        .limit(limit + 1)
        .select("fname lname email phone status userType")
        .lean();
    return res.json({
        results: users.slice(0, limit)
    });
}