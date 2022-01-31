import { Request, Response } from "express";

export const getAllUsers = async (req:Request,res:Response) => {
    return res.json({
        message: "success",
        success:true
    });
}

export const getSingleUser = async (req: Request, res: Response) => {
    return res.json({
        message: req.params.userId,
        success:true
    })
}

export const blackList = async (req: Request, res: Response) => {
    return res.json({
        message: req.params.userId,
        success:true
    })
}

