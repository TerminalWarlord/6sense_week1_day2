import type { Response } from "express";
import { manageInvitationSchema } from "../../validations/organization.validation.js";
import z from "zod";
import { OrganizationMember } from "../../models/organization_member.js";
import mongoose from "mongoose";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";
import { MembershipStatus } from "../../types/user.type.js";

export const postAcceptInvitation = async (req: CustomRequest, res: Response) => {
    const parsedData = manageInvitationSchema.safeParse(req.params.invitationId);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).errors
        });
    }
    const invitationId = new mongoose.Types.ObjectId(parsedData.data);
    const orgMember = await OrganizationMember.findOneAndUpdate({
        _id: invitationId,
        user: req.userId!
    }, {
        joinedAt: new Date(),
        status: MembershipStatus.joined,
    });
    console.log({ orgMember, invitationId, org: parsedData.data, userId: req.userId! });
    if (!orgMember) {
        return res.status(403).json({
            message: "You're not allowed to do that."
        })
    }

    res.json({
        message: "Invitation has been successfully accepted"
    })

}