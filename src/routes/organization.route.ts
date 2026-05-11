import { Router } from "express";
import { postCreateOrganization } from "../controllers/organization_controller.ts/create_organization.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { getOrganizations } from "../controllers/organization_controller.ts/get_organizations.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const organizationRouter = Router();

organizationRouter.post("/create", userMiddleware, postCreateOrganization);
// TODO: Need to work on a better middleware
organizationRouter.get("/get", adminMiddleware, getOrganizations);
