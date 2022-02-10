import { Router } from "express";
import { blackList, getAllUsers, unBlackList, getSingleUser, addUser } from "../../controllers/admin/user.manage";
export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getSingleUser);
userRouter.post("/", addUser);
userRouter.patch("/ban/:userId", blackList);
userRouter.patch("/unban/:userId", unBlackList);