import type { Response } from "express";
import { sendInvitationSchema } from "../../validations/organization.validation.js";
import z from "zod";
import { OrganizationMember } from "../../models/organization_member.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";

const PORT = process.env.PORT || 3000;
export const postSendInvitation = async (req: CustomRequest, res: Response) => {
    const parsedData = sendInvitationSchema.safeParse({ ...req.body });
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        })
    }
    const orgMember = await OrganizationMember.insertOne({
        user: parsedData.data.userId,
        organization: req.organizationId!
    });

    return res.json({
        message: "Successfully invited user",
        invitation_link: `http://localhost:${PORT}/organization/join/${orgMember._id}`
    })
}