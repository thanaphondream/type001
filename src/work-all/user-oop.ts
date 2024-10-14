import { Prisma } from '@prisma/client';
import prisma from '../prisma/db';
import createError from '../Ererr/createError';

export const userregister = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    });
}

export const userregisterpost = async (newUser: Prisma.UserCreateInput) => {
    return prisma.user.create({
        data: newUser
    });
}

export const boxLoning = async (email: string) => {
    if (!email) {
        createError("errr", 400)
    }
    return  prisma.user.findFirstOrThrow({
        where: { email: email }
    });
}

export const imoji = () => {
    const b1: string = "😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼😼"
    const b2: string = "🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵🥵"
    const bo01 = [b1, b2]
    const randomIndex = Math.floor(Math.random() * bo01.length);
    const randomText: string = bo01[randomIndex];
    return randomText
}

export const me = (email: string) => {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    })
}