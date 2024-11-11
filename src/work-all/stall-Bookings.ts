import { Request, Response, NextFunction } from 'express'
import { bookingGit_All, bookingSave_, bookingsave, bookingUpdate, booking_show_user, booking_oop_updatestatus} from './all-oop'

export const bookingsbody = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { booking_date, total_amount, discount, status, userId, marketId, lockIds } = req.body
        console.log(booking_date, total_amount, discount, status, userId, marketId, lockIds)
        const booking =  bookingSave_(booking_date, total_amount, discount, status, userId, marketId, lockIds )

        if (booking) {
            req.body.booking = booking; 
        } 
        
        next()
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401", err})
    }
}

export const bookingGit_all = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const booking = await bookingGit_All()
        res.json(booking)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401", err})
    }
}

export const bookingsSave = async( req: Request, res: Response, next: NextFunction ) => {
    try{
        const data = req.body.booking
        const bookings = await bookingsave(data)
        res.status(201).json({ msg: "Save Booking OK ", bookings})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401", err})
    }
}

export const bookingsId = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { booking } = req.params
        req.body.Id = booking
        next()
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Error Type key 401", err})
    }
}

export const bookings_Update = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const Id = req.body.Id
        const booking = req.body.booking

        const bookings = await bookingUpdate(booking, Id)

        res.status(201).json({ msg: "Update Type This OK ", bookings})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Error Type key 401", err})
    }
}

export const Booking_User_Show = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const bookings = await booking_show_user(req.body.user.id)
        res.json(bookings)
    }catch(err){
        console.log(err)
        next(err)
        res.status(400).json({ msg: "Error Type key 401 ",err})
    }
}

export const Booking_UpdateStatus = async (req:Request, res: Response, next: NextFunction) => {
    try{
        const { status } = req.body
        const id = req.body.Id
        console.log(status)
        const bookings = await booking_oop_updatestatus(status, id)
        res.status(201).json({ msg: "Update Status Ok", bookings})
    }catch(err){
        console.log(err)
        next(err)
        res.status(400).json({ msg: "Error Type key 401 ",err})
    }
}