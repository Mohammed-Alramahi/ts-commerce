import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from "dotenv";
import Client from "../entities/client";
import Admin from "../entities/admin";
import Vendor from "../entities/vendor";
dotenv.config({ path: "../../config.env" });

export const authenticate = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    let token: string = '';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next('Not Authorized');
    }
    else {

      const decoded = await jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;

      if (decoded.role == "client") {
        req.client = await Client.findOne(decoded.id);
      }
      else if (decoded.role == "admin") {
        req.admin = await Admin.findOne(decoded.id);
      }
      else {
        req.vendor = await Vendor.findOne(decoded.id);
      }
      //res.json(req.client);
      return next();
    }

  }
  catch (err) {
    let message: string = "Unknown Error";

    if (err instanceof Error) {
      message = err.message;
    }
    next(message);
  }

};
