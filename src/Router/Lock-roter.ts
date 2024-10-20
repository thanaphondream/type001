import express from 'express';
const router = express.Router();
import * as lock  from '../work-all/stall-Lock'

router.post('/lock', lock.lockSave)
router.get('/lock', lock.lcokGet_All)
router.put('/lock/:id', lock.lockUpdate)

export default router;