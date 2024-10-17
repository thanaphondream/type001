import { Request, Response, NextFunction } from 'express';
import { market, marketshowdata, marketsshowid, marketsupdates } from './all-oop';

export const markets = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { market_name, market_location, city, province } = req.body
        const data = {  market_name, market_location, city, province }
        const markets = await market(data)
        res.json({ msg : "to 200 ok Market ", markets})
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({ msg: "error type ",err})
    }
}

export const marketdatashow = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const markets = await marketshowdata()
        res.status(200).json(markets)
    }
    catch(err){
        console.log(err)
        res.status(401).json({ mgs : " error type 401", err})
        next(err)
    }
}

export const marketshowid = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
        const markets = await marketsshowid(id)
        res.json(markets)
    }catch(err){
        next(err)
        console.log(err)
        res.status(401).json({ msg: " error type ", err})
    }
}

export const marketsupdate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
        const { market_name, market_location, city, province } = req.body
        const data  = { market_name, market_location, city, province }
        const markets = await marketsupdates(data, id)
        res.json( { msg: "Update This OK : ", markets})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Error Type key 401 " , err})
    }
}

