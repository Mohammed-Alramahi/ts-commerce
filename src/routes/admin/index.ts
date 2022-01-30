import { catRouter} from "./category";
import { Router } from "express";


const adminRouter = Router();

adminRouter.use("/category", catRouter);

export default adminRouter;