import { Router } from "express";
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/product";
import { authenticate } from "../middlewares/auth";

const productsRouter =  Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:productId", getSingleProduct);
productsRouter.post("/", createProduct);

export default productsRouter;