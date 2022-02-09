import { Request, Response, NextFunction } from 'express';
import Client from '../entities/client';
import { BaseEntity, createQueryBuilder, EntitySchema } from "typeorm";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt, { Secret } from "jsonwebtoken";
import Vendor from "../entities/vendor";
import Admin from "../entities/admin";

export const login = async (req: Request, res: Response) => {

  const { email, password, role } = req.body;
  let roleEntity;
  if (role == "client") {
    roleEntity = Client;
  }
  else if (role == "admin") {
    roleEntity = Admin;
  }
  else {
    roleEntity = Vendor;
  }

  let user = await createQueryBuilder(role).select(role).from(roleEntity, role).where(`${role}.email = :email`, { email }).getOne();

  if (!user) {
    return res.json({
      error: "Wrong Credintials"
    });
  }

  else {
    if (user.verified) {
      const comparePasswords = await bcrypt.compare(password, user.password);

      if (comparePasswords) {
        const token = jwt.sign({ email: user.email, role: role }, process.env.JWT_SECRET as Secret);
        return res.json({
          success: true,
          token
        });
      }

      else {
        return res.status(404).json({
          success: false,
          error: "Wrong Credintials"
        });
      }
    }
    else {
      return res.status(400).json({
        success: false,
        error: "account not verified yet"
      });
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
        password: hashedPassword,
        country,
        address,
        post_code: postCode,
        city,
        phone,
        avatar,
        verification_code: verificationCode,
      });

      await client.save();
      let message = client.email + " has been created successfully";
      return res.json({
        success: true,
        message
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

export const verifyUser = async (req: Request, res: Response) => {

  const { token } = req.body;
  const { userId } = req.params;

  try {

    const client = await createQueryBuilder("client")
      .select("client")
      .from(Client, "client")
      .where("client.id= :userId", { userId })
      .andWhere("client.verification_code= :token", { token })
      .andWhere("client.verified= false")
      .getOne();

    if (client) {
      await createQueryBuilder("client")
        .update(Client)
        .set({ verified: true })
        .where("client.id= :userId", { userId })
        .execute();
      return res.status(200).json({ success: true });
    }

    else {
      return res.status(400).json({
        success: false,
        error: "wrong information provided",
      });

    }

  }
  catch (err) {
    let message: string = 'Unknown Error';

    if (err instanceof Error) {
      message = err.message;
    }

    return res.status(409).json({
      error: message,
    });
  }

};