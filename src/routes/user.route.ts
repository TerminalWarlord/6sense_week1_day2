import { Router } from "express";
import { postCreateUser } from "../controllers/user_controllers/create_user.controller.js";
import { patchUpdateUser } from "../controllers/user_controllers/update_user.controller.js";
import { getUser } from "../controllers/user_controllers/get_user.controller.js";
import { deleteUser } from "../controllers/user_controllers/delete_user.controller.js";
import { getUsers } from "../controllers/user_controllers/get_users.controller.js";
import { postLoginUser } from "../controllers/user_controllers/login_user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

export const userRouter = Router();

userRouter.post("/register", postCreateUser);
userRouter.post("/login", postLoginUser);
userRouter.patch("/update/:userId", userMiddleware, patchUpdateUser);
userRouter.get("/get_users/", getUsers);
userRouter.get("/get_user/:userId", getUser);
userRouter.delete("/delete/:userId", adminMiddleware, deleteUser);