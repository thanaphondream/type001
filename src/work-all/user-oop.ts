import { Prisma } from '@prisma/client';
import prisma from '../prisma/db';
import createError from '../Ererr/createError';

export const boxLoning = async (email: string) => {
    if (!email) {
        createError("errr", 400)
    }
    return  prisma.user.findFirstOrThrow({
        where: { email: email }
    });
}