import { Request, Response, NextFunction } from "express";
import Product from "../entities/product";
import { v4 as uuid, parse } from "uuid";
import { createQueryBuilder } from "typeorm";
import Vendor from "../entities/vendor";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    return res.json(await Product.find());
};

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        return res.json(await Product.findOne({ where: { id: productId } }));
    }
    catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.json({
            success: false,
            error: message
        });
    }
};

export const getProductByVendorId = async (req: Request, res: Response) => {
    const { vendorId } = req.params;
    const products = await createQueryBuilder("product")
        .select(['p.product_name'
            , 'p.product_description'
            , 'p.image1'
            , 'p.image2'
            , 'p.image3'
            , 'p.price'
            , 'p.stock'
            , 'p.category_id'
            , 'v.name', 'c.category_name']).from(Product, "p").leftJoin('p.vendor', 'v').leftJoin('p.category', 'c').where("p.vendor_id= :vendorId", { vendorId }).getMany();
    return res.json(products);
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productName, description, image1, image2, image3, price, stock, catId, vendorId } = req.body;
    try {
        const product = await Product.create({
            id: uuid(),
            product_name: productName,
            product_description: description,
            image1,
            image2,
            image3,
            price: parseInt(price),
            stock: parseInt(stock),
            category: catId,
            vendor: vendorId
        });
        await product.save();
        return res.json({
            success: true,
            message: `${product.product_name} has been created`
        });
    } catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.json({
            success: false,
            error: message
        });
    }

};
