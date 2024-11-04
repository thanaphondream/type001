import { Prisma } from '@prisma/client';
import prisma from '../prisma/db';
import createError from '../Ererr/createError';
import { connect } from 'http2';

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
    return prisma.user.findFirstOrThrow({
        where: {
            email: email
        },
       select:{
        id : true,
        username: true,
        email: true,
        password: true
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
            Lock: {
                include: {
                    bookings: true
                }
            },
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

export const lock_Id = (lock: string) => {
    return prisma.lock.findFirst({
        where: {
            id: Number(lock)
        }, include: {
            zone: true
        }
    })
}

export const bookingSave_ = (
    booking_date: string,
    total_amount: string,
    discount: string,
    status: string,
    userId: number,
    marketId: number,
    lockIds: number[]
) => {
    const data: Prisma.BookingCreateInput = {
        booking_date: new Date(booking_date),
        total_amount: new Prisma.Decimal(total_amount),
        discount: new Prisma.Decimal(discount || '0.00'),
        status: status,
        user: { connect: { id: userId } },
        market: { connect: { id: marketId } },
        lock: {
            connect: lockIds.map((lockId) => ({ id: lockId }))
        }
    };

    return data;
};

export const bookingsave = (data: Prisma.BookingCreateInput) => {
    return prisma.booking.create({
        data,
        include: {
            lock: true, 
        }
    })
}

export const bookingGit_All = () => {
    return prisma.booking.findMany({
        include: {
            lock: true
        }
    })
}

export const bookingUpdate = (booking: Prisma.BookingUpdateInput, Id: string) => {
    return prisma.booking.update({
        where: {
            id: Number(Id)
        },
        data: booking
    })
}

export const paymet_modelDate = (amount: string, date: string, payment_image: string, status: string, bookingId: number) => {
    
    const data: Prisma.PaymentCreateInput = {
        amount: new Prisma.Decimal(amount),
        date: new Date(date),
        payment_image: payment_image,
        status: status,
        booking: { connect: { id: Number(bookingId) } }

    }
    return(data)
}

export const payment_SaveModel = ( payment: Prisma.PaymentCreateInput) => {
    return prisma.payment.create({
        data: payment
    })
}

export const paymet_Update_OOP = (payment: Prisma.PaymentUpdateInput, id: string) => {
    return prisma.payment.update({
        where: {
            id : Number(id)
        }, data:  payment
    })
}

export const payment_show_User = (user: string) => {
    return prisma.booking.findMany({
        where: {
            userId: Number(user)
        }, include: {
            payment: true
        }
    })
}

export const Paymet_Sh_Opp = () => {
    return prisma.payment.findMany()
}