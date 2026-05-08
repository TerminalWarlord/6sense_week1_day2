import { Router } from "express";
import { postCreateUser } from "../controllers/user_controllers/create_user.controller.js";
import { patchUpdateUser } from "../controllers/user_controllers/update_user.controller.js";

export const userRouter = Router();

userRouter.post("/register", postCreateUser);
userRouter.patch("/update/:userId", patchUpdateUser);