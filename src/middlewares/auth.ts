import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from "dotenv";
import Client from "../entities/client";
dotenv.config({ path: "../../config.env" });

export const authenticate = async(req: Request|any, res: Response, next: NextFunction) => {
  let token: string = '';
  if (req.headers.authorization &&req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next('Not Authorized');
  }
  else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
    req.client = await Client.findOne(parseInt(decoded.id));
    res.json(req.client);
  }
  
};
