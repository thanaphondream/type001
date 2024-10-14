import express from 'express';
const router = express.Router();
import { authenticates } from '../auth/authenticate';
import * as stall from '../work-all/stall-Markets'

router.post('/markets', stall.markets )

router.get('/markets', stall.marketdatashow)
router.get('/markets/:id', stall.marketshowid)

export default router;