import { Request, Response, NextFunction } from 'express'
import { paymet_modelDate, payment_SaveModel, paymet_Update_OOP, payment_show_User } from './all-oop'
import cloudUpload from '../middlewares/CloudUpload'

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

export const paymet_Id = (req: Request, res: Response, next: NextFunction) => {
    try{
        const { paymet } = req.params
        
        req.body.paymentId = paymet

        next()
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Type Error key 401 ",err})
    }
}

export const Paymet_Update = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const payment = req.body.payment
        const id = req.body.paymentId

        const payments = await paymet_Update_OOP(payment, id)

        if(!payments) {
            res.status(401).json({ msg: "Error paymets update not "})
        }

        res.status(201).json({ msg: "Update Paymet Ok ", payments})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401", err})
    }
}

export const payment_show = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.body.user.id
        console.log(user)
        const paymets = await payment_show_User(user)
        res.json(paymets)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401 ", err})
    }
}