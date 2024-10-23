import express from 'express';
const router = express.Router();
import { authenticates } from '../auth/authenticate';
import * as paymet from '../work-all/stall-Payment'

router.post('/paymet', authenticates, paymet.payment_model, paymet.payment_save)

export default router;