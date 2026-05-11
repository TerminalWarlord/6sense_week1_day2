import { Router } from "express";
import { postCreateOrganization } from "../controllers/organization_controller/create_organization.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { getOrganizations } from "../controllers/organization_controller/get_organizations.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { UserType } from "../types/user.type.js";

export const organizationRouter = Router();

organizationRouter.post("/create", userMiddleware, postCreateOrganization);
// TODO: Need to work on a better middleware
organizationRouter.get("/get", adminMiddleware(UserType.owner), getOrganizations);
organizationRouter.post("/invite-user", adminMiddleware(UserType.admin), getOrganizations);
