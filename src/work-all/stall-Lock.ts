import { Request, Response, NextFunction } from 'express';
import { lockSaves_oop, lockget_all, lcokUpdate_all } from './all-oop';
import { Prisma } from '@prisma/client';

export const lockSave = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const { lock_name, status, marketId, lock_price, zoneId } = req.body
        const locks = await lockSaves_oop(lock_name, status, marketId, lock_price, zoneId)
        res.json(locks)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Type Error key 401", err})
    }
}

export const lcokGet_All = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locks = await lockget_all()
        res.json(locks)
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Type Error key 401 ", err})
    }
}

export const lockUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const { id } = req.params
      const { lock_name, status, marketId, lock_price, zoneId } = req.body

      const data: Prisma.LockCreateInput = {
        lock_name,
        status: status || 'ว่าง', 
        market: { connect: { id: marketId } },
        lock_price,
        zone: { connect: { id: zoneId } }
    }

    const locks = await lcokUpdate_all(data, id)

    if(!locks){
        res.status(400).json({ msg: " Error lock not update "})
    }

    res.json({ msg: "This Ok 200", locks})
    }catch(err){
        console.log(err)
        next(err)
        res.status(401).json({ msg: "Type Error key 401 ", err})
    }
}