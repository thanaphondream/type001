import { Request, Response, NextFunction } from 'express'
import { bookingGit_All, bookingSave_, bookingsave, bookingUpdate} from './all-oop'

export const bookingsbody = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { booking_date, total_amount, discount, status, userId, marketId} = req.body
        const booking =  bookingSave_(booking_date, total_amount, discount, status, userId, marketId)

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