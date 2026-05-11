import z from "zod";

export const createOrganizationSchema = z.object({
    name: z.string()
});

export const manageOrganizationSchema = z.object({
    organizationId: z.string().optional()
})

export const getOriganizationsSchema = z.object({
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).max(10).default(10)
})

export const sendInvitationSchema = z.object({
    userId: z.string(),
})