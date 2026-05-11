import type { Response } from "express";
import { Organization } from "../../models/organization.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";
import { OrganizationMember } from "../../models/organization_member.js";

export const deleteOrganization = async (req: CustomRequest, res: Response) => {
    await OrganizationMember.deleteMany({
        organization: req.organizationId!
    })
    await Organization.deleteOne({
        _id: req.organizationId!
    });
    res.json({
        message: "Organization has been deleted"
    })
}