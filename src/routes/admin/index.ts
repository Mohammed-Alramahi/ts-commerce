import { catRouter} from "./category";
import { Router } from "express";
import { userRouter } from "./user";


const adminRouter = Router();

adminRouter.use("/category", catRouter);
adminRouter.use("/user", userRouter);
export default adminRouter;