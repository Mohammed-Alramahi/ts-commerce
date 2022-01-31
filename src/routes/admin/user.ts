import { Router } from "express";
import { blackList, getAllUsers,getSingleUser } from "../../controllers/admin/user.manage";
export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getSingleUser);
userRouter.patch("/:userId", blackList);