import type { Request, Response } from "express";
import z from "zod";
import { UserStatus, UserType } from "../../types/user.type.js";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";

export const postCreateUser = async (req: Request, res: Response) => {
    const schema = z.object({
        fname: z.string().max(32).min(3),
        lname: z.string().max(32).min(3),
        userType: z.enum(UserType).default(UserType.user),
        status: z.enum(UserStatus).default(UserStatus.active),
        email: z.email(),
        phone: z.string().max(14).min(11),
        password: z.string().min(8).max(100)
    });

    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        });
    }
    const {
        email,
        fname,
        lname,
        password,
        phone,
        status,
        userType
    } = parsedData.data;
    const user = await User.findOne({
        $or: [
            {
                "email": email
            },
            {
                "phone": phone
            }
        ]
    });
    if (user) {
        return res.status(403).json({
            message: "User already exist with this email/phone number."
        });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.insertOne({
        fname,
        lname,
        email,
        phone,
        status,
        userType,
        password: hashedPassword
    });
    res.status(201).json({
        message: "You have signed up sucessfully",
        userId: newUser._id
    })

}