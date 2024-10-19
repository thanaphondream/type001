import express from 'express';
const router = express.Router();
import * as zone  from '../work-all/stall-Zone'

router.post('/zone', zone.zonesave)
router.get('/zone/:markets', zone.zoneshowall)
router.get('/zoneId/:id', zone.zonesshowid)
router.put('/zone/:id', zone.zoneupdate)

export default router;