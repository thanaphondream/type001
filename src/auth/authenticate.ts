import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createError from '../Ererr/createError';
import { me } from '../work-all/all-oop';

interface JwtPayload {
    email: string;
}

export const authenticates = async ( request: Request, res: Response, next: NextFunction) => {
    try{
        const hashedToken = request.headers.authorization
        if(!hashedToken){
            return createError("err", 400)
        }
        const tokens = hashedToken.split(" ")[1]

        const verify = jwt.verify(tokens, process.env.JWT_SECRET|| '1')as JwtPayload;
        const user  = await me(verify.email)
        console.log(verify)
        if(verify)
        if (user?.email) {
            request.user = user;
          }
          console.log(request.user)
          next();
    }catch(err){
        console.log(err)
        res.status(400).json({ msg: "error token key ", err})
    }
}