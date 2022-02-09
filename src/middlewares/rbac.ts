import { NextFunction, Request, Response } from "express";

export const adminCheck = (req: Request | any, res: Response, next: NextFunction) => {
    if (req.admin) {
        return next();
    }
    else {
        return next("Not Authorized Access");
    }
};

export const vendorCheck = (req: Request | any, res: Response, next: NextFunction) => {
    if (req.vendor) {
        return next();
    }
    else {
        return next("Not Authorized Access");
    }
};