import { Request, Response } from "express";
import Category from "../../entities/category";
import { v4 as uuid } from "uuid";
import { createQueryBuilder } from "typeorm";

export const addCategory = async (req: Request, res: Response) => {

    try {
        const { name, image, description } = req.body;
        const category = Category.create({
            id: uuid(),
            category_name: name,
            category_image: image,
            category_description: description
        });
        await category.save();
        res.json({
            success: true,
            category
        });
    }
    catch (err) {
        let message: string = "Unknown Error";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.status(409).json({
            success: false,
            message
        });
    }
};

export const retrieveAllCategories = async (req: Request | any, res: Response) => {
    return res.json(await Category.find());
};

export const editCategory = async (req: Request, res: Response) => {
    const { catId } = req.params;
    const { name, image, description } = req.body;

    try {
        await createQueryBuilder("category")
            .update(Category)
            .set({ category_name: name, category_image: image, category_description: description })
            .where("category.id = :catId", { catId }).execute();

        return res.json({
            success: true,
            message: "Category updated successfully",
        });
    }
    catch (err) {
        let message: string = "Unknown Error";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.json({
            success: false,
            message
        });
    }

};