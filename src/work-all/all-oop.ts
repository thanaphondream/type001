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

export const market = (data: Prisma.MarketsCreateInput) => {
    return prisma.markets.create({
        data: data
    })
}

export const marketshowdata = () => {
    return prisma.markets.findMany({
        include: {
            zones: true
        }
    })
}

export const marketsshowid = (id: string) => {
    return prisma.markets.findFirst({
        where : {
            id: Number(id)
        },include: {
            zones: true
        }
    })
}

export const marketsupdates = (data: Prisma.MarketsUpdateInput, id: string) => {
    return prisma.markets.update({
        where: {
            id: Number(id)
        },
        data: data
    })
}

export const zonesaves = async (zone: string, marketId: number) => {
    return await prisma.zone.create({
        data: {
            zone,
            marketId
        }
    });
};

export const zonesshowall = (id: string) => {
    return prisma.zone.findMany({
        where: {
            marketId: Number(id)
        },
        include: {
            Lock: true
        }
    })
}

export const zoneshowids = ( id: string ) => {
    return prisma.zone.findFirst({
        where: {
            id: Number(id)
        }
    })
}

export const zonesupdate = (
    zone: Prisma.ZoneUpdateInput, 
    marketId: Prisma.ZoneUpdateInput, 
    id: string) => {

        return prisma.zone.update({
            where: {
                id: Number(id)
            },
            data: {
                zone: String(zone),
                marketId: Number(marketId)
            }
        })
    
}

export const lockSaves_oop = (
    lock_name: Prisma.LockCreateInput, 
    status: Prisma.LockCreateInput, 
    marketId: Prisma.LockCreateInput, 
    lock_price: number, 
    zoneId: Prisma.LockCreateInput) => {

    return prisma.lock.create({
        data: {
            lock_name: String(lock_name),
            status: String(status),
            marketId: Number(marketId),
            lock_price: new Prisma.Decimal(lock_price),
            zoneId: Number(zoneId)
        }
    })

}

export const lockget_all = () =>{
    return prisma.lock.findMany()
}

export const lcokUpdate_all  = (data: Prisma.LockCreateInput, id: string) => {
    return prisma.lock.update({
        where: {
            id: Number(id)
        },data: data
    })
}