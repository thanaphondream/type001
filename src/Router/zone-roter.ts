import express from 'express';
const router = express.Router();
import * as zone  from '../work-all/stall-Zone'

router.post('/zone', zone.zonesave)
router.get('/zone', zone.zoneshowall)
router.get('/zone/:id', zone.zonesshowid)
router.put('/zone/:id', zone.zoneupdate)

export default router;