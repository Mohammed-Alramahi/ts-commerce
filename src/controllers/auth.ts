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
      error:"Wrong Credintials"
    })
  }
  else {
    const comparePasswords = await bcrypt.compare(password, client.password);
    if (comparePasswords) {
      const token = jwt.sign(client.email, process.env.JWT_SECRET as Secret);
      return res.json({
        success:true,
        token
      })
    }
    else {
      return res.json({
        success:false,
        error:"Wrong Credintials"
      })
    }
  }

};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    email,
    address,
    postCode,
    city,
    phone,
    password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const client = Client.create({
      id: uuid(),
      first_name: firstName,
      last_name: lastName,
      email,
      password:hashedPassword,
      address,
      post_code: postCode,
      city,
      phone,
    });

    await client.save();

    return res.json({
      message: client,
    });
  } catch (err) {
    let message: string = 'unknown error';

    if (err instanceof Error) {
      message = err.message;
    }

    res.json({
      error: message,
    });
    next(err);
  }
};
