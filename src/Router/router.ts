import express from 'express';
const router = express.Router();
import * as user from '../work-all/user-cotest';
import { loginUser } from '../work-all/user-cotest';

router.post('/regenter', user.usersave);
router.post('/Loing', loginUser)

export default router;
