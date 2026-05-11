import z from "zod";

export const createOrganizationSchema = z.object({
    name: z.string()
});

export const manageOrganizationSchema = z.object({
    organizationId: z.string()
})