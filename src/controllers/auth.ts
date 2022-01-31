import { Request, Response, NextFunction } from 'express';
import Client from '../entities/client';
import { createQueryBuilder } from "typeorm";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt, { Secret } from "jsonwebtoken";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const client = await createQueryBuilder("client").select("client").from(Client, "client").where("client.email = :email",{email}).getOne();
  if (!client) {
    return res.json({
      error: "Wrong Credintials"
    });
  }
  else {

    if (client.verified) {
      const comparePasswords = await bcrypt.compare(password, client.password);

      if (comparePasswords) {
        const token = jwt.sign(client.email, process.env.JWT_SECRET as Secret);
        return res.json({
          success:true,
          token
        })
      }

      else {
        return res.status(404).json({
          success:false,
          error:"Wrong Credintials"
        })
      }
    } 

    else {
      return res.status(400).json({
        success:false,
        error:"account not verified yet"
      })
    }
  }
  

};

export const register = async (req: Request, res: Response) => {
  
  const {
    firstName,
    lastName,
    email,
    address,
    postCode,
    city,
    phone,
    password,
    country,
    gender,
    avatar
  } = req.body;
  
  try {

    const existingUser = await Client.findOne({ where: { email } });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = uuid();
      const client = Client.create({
        id: uuid(),
        first_name: firstName,
        last_name: lastName,
        gender,
        email,
        password:hashedPassword,
        country,
        address,
        post_code: postCode,
        city,
        phone,
        avatar,
        verification_code: verificationCode,
      });
  
      await client.save();
  
      return res.json({
        message: client,
      });
    }
    else {
      throw new Error("User Already Exists!");
    }
    
  } catch (err) {
    let message: string = 'unknown error';

    if (err instanceof Error) {
      message = err.message;
    }

    res.status(409).json({
      error: message,
    });
    
  }
};

export const verifyUser = async (req:Request, res:Response) => {
  return res.json({
      user: req.params.userId,
      token:req.query.token
  });
}