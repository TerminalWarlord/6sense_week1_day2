import type { Response } from "express";
import { deleteRemoveUserFromOrgSchema } from "../../validations/organization.validation.js";
import z from "zod";
import { OrganizationMember } from "../../models/organization_member.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";

export const deleteRemoveUserFromOrg = async (req: CustomRequest, res: Response) => {
    const parsedData = deleteRemoveUserFromOrgSchema.safeParse(req.params.userId);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).errors
        })
    }
    await OrganizationMember.deleteOne({
        user: parsedData.data,
        organization: req.organizationId!
    });
    return res.json({
        message: "User has been removed from the organization"
    })
}