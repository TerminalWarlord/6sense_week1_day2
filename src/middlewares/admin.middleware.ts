import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { manageOrganizationSchema } from "../validations/organization.validation.js";
import z from "zod";
import { OrganizationMember } from "../models/organization_member.js";


export interface CustomRequest extends Request {
    userId?: mongoose.Types.ObjectId
    organizationId?: mongoose.Types.ObjectId
}
export const adminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const parsedData = manageOrganizationSchema.safeParse({
        organizationId: req.params.organizationId
    });
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        });
    }
    const orgId = new mongoose.Types.ObjectId(parsedData.data.organizationId);
    const org = await OrganizationMember.findOne({
        organization: orgId,
        user: req.userId!
    });
    if (!org || org.userType !== "admin") {
        return res.status(403).json({
            message: "You don't have sufficient permission"
        });
    }
    next();
}