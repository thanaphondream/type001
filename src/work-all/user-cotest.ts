import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../prisma/db';
import bcrypt from 'bcrypt'
import createError from '../Ererr/createError';
import jwt from 'jsonwebtoken';
import { boxLoning } from './user-oop';


export const usersave = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { email, username, password, role, compassword } = req.body;

        const usershowemail = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (usershowemail) {
            res.status(401).json({ msg: "Email already exists." });
        }

        if(compassword !== password) {
            return createError("confirm password not match", 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = {
            email,
            username,
            password: hashedPassword, 
            role
        };

        const user = await prisma.user.create({
            data: newUser
        });

        res.status(201).json({ msg: "User created successfully", user });
        console.log(newUser)
    } catch (err) {
        next(err)
    }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

       const user = await boxLoning(email)

       if (typeof user.password !== 'string') {
         return createError("err", 400)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
         res.status(401).json({ msg: "Invalid email or password." });
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret_key', 
        { expiresIn: '4d' } 
    );

    res.status(200).json({ msg: "ล็อกอินสำเร็จแล้ว", token });
    console.log(user, token)
    // res.json({msg: "Hello", user})
    } catch (err) {
        next(err);
    }
};
