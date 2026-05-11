import type { Response } from "express";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";
import { addMemberSchema } from "../../validations/organization.validation.js";
import z from "zod";
import { OrganizationMember } from "../../models/organization_member.js";
import { MembershipStatus } from "../../types/user.type.js";

export const postAddMember = async (req: CustomRequest, res: Response) => {
    const parsedData = addMemberSchema.safeParse({ ...req.body });
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        })
    }
    await OrganizationMember.insertOne({
        user: req.userId!,
        organization: req.organizationId!,
        userType: parsedData.data.userType,
        status: MembershipStatus.invited,
        joinedAt: new Date()
    });
    return res.json({
        message: `User has been added as ${parsedData.data.userType}`
    })
}