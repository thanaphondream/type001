import { Request, Response, NextFunction } from 'express'
import { paymet_modelDate, payment_SaveModel } from './all-oop'
import cloudUpload from '../middlewares/CloudUpload'
import { strict } from 'assert'

export const payment_model = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { amount, date, status, bookingId } = req.body
        console.log(47, amount, date, status, bookingId)

        const imagePromises = (req.files as Express.Multer.File[]).map(file => cloudUpload(file.path)); 
        const imageUrls = await Promise.all(imagePromises);

        const imageUrl = imageUrls[0];

        const params = paymet_modelDate(amount, date, imageUrl, status, bookingId);

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