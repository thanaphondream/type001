import { Request, Response, NextFunction } from 'express'
import { paymet_modelDate, payment_SaveModel } from './all-oop'

export const payment_model =  (req: Request, res: Response, next: NextFunction) => {
    try{
        const { amount, date, payment_image, status, bookingId } = req.body
        const params =  paymet_modelDate(amount, date, payment_image, status, bookingId)

        if(!params){
            res.status(400).json({ msg: " ERROR data key 400"})
        } 

        req.body.payment = params
        next()
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401",err})
    }
}

export const payment_save = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const paymet = req.body.payment
        const paymets = await payment_SaveModel(paymet)

        if(!paymets){
            res.status(400).json({ msg: " ERROR Posh key 400"})
        }

        res.status(201).json({ msg: "Save Paymet This OK" , paymets})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401",err})
    }
}