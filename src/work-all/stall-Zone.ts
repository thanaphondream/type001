import { Request, Response, NextFunction } from 'express';
import { zonesaves, zonesshowall, zoneshowids, zonesupdate } from './all-oop';

export const zonesave = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const { zone, marketId } = req.body
        console.log(zone, marketId)
        const zones = await zonesaves(zone, marketId)
        res.json({ msg: "This ok Save Zone", zones})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "error type key ", err})
    }
}

export const zoneshowall = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const { markets } = req.params
        const zones = await zonesshowall(markets)
        res.json(zones)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ mag: "Type Error key 401", err})
    }
}

export const zonesshowid = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
        const zones = await zoneshowids( id )
        res.json(zones)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json( { msg: "Type error key 401", err})
    }
}

export const zoneupdate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
        const { zone, marketId } = req.body
        const zones = await zonesupdate( zone, marketId , id)
        res.json(zones)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Error Type key 401", err})
    }
}