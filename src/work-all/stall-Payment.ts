import { Request, Response, NextFunction } from 'express'
import { paymet_modelDate, payment_SaveModel, paymet_Update_OOP, payment_show_User, Paymet_Sh_Opp } from './all-oop'
import CloudUpload from '../middlewares/CloudUpload'
import QRCode from 'qrcode'
import generatePayload from 'promptpay-qr'
// import bodyParser  from 'body-parser'
import _ from 'lodash'

export const payment_model = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, date, status, bookingId } = req.body;
      console.log(47, amount, date, status, bookingId);
  
      // ตรวจสอบว่ามีไฟล์อัปโหลดหรือไม่
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
         res.status(400).json({ msg: 'No files uploaded' });
      }
  
      const imagePromises = (req.files as Express.Multer.File[]).map(file => 
        CloudUpload(file.buffer, file.originalname) // ใช้ buffer แทน path
      );
      const imageUrls = await Promise.all(imagePromises);
  
      const imageUrl = imageUrls[0]; // ใช้ URL ของภาพแรก
  
      const params = paymet_modelDate(amount, date, imageUrl, status, bookingId);
  
      if (!params) {
         res.status(400).json({ msg: 'ERROR data key 400' });
      }
  
      req.body.payment = params;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: 'Type Error key 401', err });
    }
  };

export const payment_save = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const paymet = req.body.payment
        console.log(paymet)
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

export const paymet_ShowAll = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const paymets = await Paymet_Sh_Opp()
        res.json(paymets)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: " Type Error key 401 " , err})
    }
}


export const paymet_Qrcode = async (req: Request, res: Response) => {
    // const amount = parseFloat(_.get(req.body, 'amount', '0'));
    const { amount } = req.body
    if (amount == null || isNaN(Number(amount))) {
        res.status(400).json({ msg: 'Amount must be a valid number', amount });
    }
    const mobileNumber = '0647641385';
    const payload = generatePayload(mobileNumber, { amount });

    const option = {
        color: {
            dark: '#000',
            light: '#fff',
        },
    };

    try {
        const url = await QRCode.toDataURL(payload, option);
         res.status(200).json({
            RespCode: 200,
            RespMessage: 'good',
            Result: url,
        });
    } catch (err) {
        console.error('generate fail:', err);
         res.status(400).json({
            RespCode: 400,
            RespMessage: 'bad: ' + err,
        });
    }
}
