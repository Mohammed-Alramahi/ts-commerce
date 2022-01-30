import { Request, Response, NextFunction } from "express";
import Product from "../entities/product";
import { v4 as uuid, parse } from "uuid";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    return res.json(await Product.find());
}

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
    return res.json(await Product.findOne({where:{id:productId}}));
    }
    catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.json({
            success: false,
            error:message
        })
    }
}

export const createProduct =async (req:Request,res:Response,next:NextFunction) => {
    const { productName, description, image1,image2,image3, price, stock, catId } = req.body;
    try {
        const product = await Product.create({
            id:uuid(),
            product_name: productName,
            product_description: description,
            image1,
            image2,
            image3,
            price: parseInt(price),
            stock: parseInt(stock),
            category_id:catId
        })
        await product.save();
        return res.json({
            success: true,
            message: `${product.product_name} has been created`
       })
    } catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.json({
            success: false,
            error:message
        })
    } 
   
}
