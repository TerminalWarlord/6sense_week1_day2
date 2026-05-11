import type { Response } from "express";
import { getOriganizationsSchema } from "../../validations/organization.validation.js";
import z from "zod";
import { Organization } from "../../models/organization.js";
import type { CustomRequest } from "../../middlewares/admin.middleware.js";

export const getOrganizations = async (req: CustomRequest, res: Response) => {
    const parsedData = getOriganizationsSchema.safeParse({ ...req.params })
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: z.treeifyError(parsedData.error).properties
        })
    }
    const {
        limit,
        offset
    } = parsedData.data;
    const orgs = await Organization.find()
        .select("_id name creator createdAt updatedAt")
        .skip(offset)
        .limit(limit + 1);
    res.json({
        results: orgs.slice(0, limit),
        has_next_page: orgs.length > limit
    })

}