import { Request, Response } from "express";
import Client from "../../entities/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createQueryBuilder } from "typeorm";

export const getAllUsers = async (req: Request, res: Response) => {
    return res.json({
        success: true,
        users: await Client.find()
    });
};

export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const client = await Client.findOne(userId);
    if (client) {
        return res.json({
            success: true,
            client
        });
    }
    else {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }
};

export const blackList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    await createQueryBuilder("client")
        .update(Client)
        .set({ blacklisted: true })
        .where("client.id= :userId", { userId }).execute();
};

export const addUser = async (req: Request, res: Response) => {
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
            verified: true,
            verification_code: verificationCode,
        });

        await client.save();

        return res.json({
            success: true,
            message: `User with email ${email} has been created successfully`
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

