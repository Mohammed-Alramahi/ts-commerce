import { Router } from "express";
import { addCategory, editCategory, retrieveAllCategories } from "../../controllers/admin/category.manage";
export const catRouter = Router();

catRouter.get("/", retrieveAllCategories);
catRouter.post("/", addCategory);
catRouter.patch("/:catId", editCategory);
