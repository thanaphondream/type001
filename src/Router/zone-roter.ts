import express from 'express';
const router = express.Router();
import { authenticates } from '../auth/authenticate';
import * as zone  from '../work-all/stall-Zone'

router.post('/zone', zone.zonesave)
router.get('/zone', zone.zoneshowall)

export default router;