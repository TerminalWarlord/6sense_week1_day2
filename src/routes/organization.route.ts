import { Router } from "express";
import { postCreateOrganization } from "../controllers/organization_controller.ts/create_organization.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

export const organizationRouter = Router();

organizationRouter.post("/create", userMiddleware, postCreateOrganization);
