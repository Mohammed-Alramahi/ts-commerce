import { Request,Response } from "express";

export const addCategory = async (req:Request, res:Response) => {
    res.send("Add");
}

export const retrieveAllCategories = async (req:Request,res:Response) => {
    res.send("hello")
}