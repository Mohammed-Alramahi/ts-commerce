import { catRouter } from "./category";
import { Router } from "express";
import { userRouter } from "./user";
import { authenticate } from "../../middlewares/auth";
import { adminCheck } from "../../middlewares/rbac";

const adminRouter = Router();

adminRouter.use(authenticate);
adminRouter.use(adminCheck);
adminRouter.use("/category", catRouter);
adminRouter.use("/user", userRouter);
export default adminRouter;