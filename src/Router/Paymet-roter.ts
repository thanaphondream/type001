import express from 'express';
const router = express.Router();
import { authenticates } from '../auth/authenticate';
import * as paymet from '../work-all/stall-Payment'
import upload from '../middlewares/upload'

router.post('/paymet',authenticates, upload.array('payment_image', 1), paymet.payment_model, paymet.payment_save)

export default router;