import type { Response } from "express";
import { createOrganizationSchema } from "../../validations/organization.validation.js";
import z from "zod";
import { Organization } from "../../models/organization.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";

export const postCreateOrganization = async (req: CustomRequest, res: Response) => {
    const parsedData = createOrganizationSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        })
    }
    const org = await Organization.insertOne({
        name: parsedData.data.name,
        creator: req.userId!
    });
    res.json({
        message: "You've successfully created an organization",
        orgId: org._id
    })

}