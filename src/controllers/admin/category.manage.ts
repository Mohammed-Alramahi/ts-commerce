import { NextFunction,Request,Response } from "express";

export const addCategory = async (req:Request, res:Response, next:NextFunction) => {
    res.send("Add");
}

export const retrieveAllCategories = async (req:Request,res:Response,next:NextFunction) => {
    res.send("hello")
}