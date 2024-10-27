import express from 'express';
const router = express.Router();
import { authenticates } from '../auth/authenticate';
import * as paymet from '../work-all/stall-Payment'
import upload from '../middlewares/upload'

router.post('/paymet',authenticates, upload.array('payment_image', 1), paymet.payment_model, paymet.payment_save)
router.put('/paymet/:paymet', authenticates, upload.array('payment_image', 2), paymet.payment_model, paymet.paymet_Id, paymet.Paymet_Update)
router.get('/payment', authenticates, paymet.payment_show)

export default router;