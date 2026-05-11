import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { manageOrganizationSchema } from "../validations/organization.validation.js";
import z from "zod";
import { OrganizationMember } from "../models/organization_member.js";
import type { CustomRequest } from "./admin.middleware.js";

// This middleware is for the cased where 
// both admin and owner can do some action
export const moderatorMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
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
    let org;
    if (orgId) {
        org = await OrganizationMember.findOne({
            user: req.userId!,
            organization: orgId
        });
    }
    else {
        org = await OrganizationMember.findOne({
            user: req.userId!,
        }).sort({ lastAccessedAt: -1 });
    }
    if (!org || org.userType !== "user") {
        return res.status(403).json({
            message: "You don't have sufficient permission"
        });
    }
    OrganizationMember.updateOne({
        user: req.userId!,
        organization: org._id
    }, {
        lastAccessedAt: new Date()
    })
    req.organizationId = org._id;
    next();
}