import { Router } from "express";
import { postCreateOrganization } from "../controllers/organization_controller/create_organization.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { getOrganizations } from "../controllers/organization_controller/get_organizations.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { UserType } from "../types/user.type.js";
import { postAddMember } from "../controllers/organization_controller/add_member.controller.js";
import { deleteRemoveUserFromOrg } from "../controllers/organization_controller/remove_user.controller.js";
import { deleteOrganization } from "../controllers/organization_controller/delete_organization.controller.js";
import { postAcceptInvitation } from "../controllers/organization_controller/accept_invitation.controller.js";

export const organizationRouter = Router();
// User
organizationRouter.post("/create", userMiddleware, postCreateOrganization);
organizationRouter.post("/join/:invitationId", userMiddleware, postAcceptInvitation);
// Admin
organizationRouter.post("/invite-user", adminMiddleware(UserType.admin), getOrganizations);

// Owner
organizationRouter.get("/get", userMiddleware, adminMiddleware(UserType.owner), getOrganizations);
organizationRouter.delete("/delete-organization", userMiddleware, adminMiddleware(UserType.owner), deleteOrganization);
organizationRouter.post("/add-member", userMiddleware, adminMiddleware(UserType.owner), postAddMember);
organizationRouter.delete("/remove-member/:userId", userMiddleware, adminMiddleware(UserType.owner), deleteRemoveUserFromOrg);