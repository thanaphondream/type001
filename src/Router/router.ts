import express from 'express';
const router = express.Router();
import * as user from '../work-all/user-cotest';
import { loginUser } from '../work-all/user-cotest';
import { authenticates } from '../auth/authenticate';

router.post('/regenter', user.usersave);
router.post('/loing', loginUser)

router.get('/me',authenticates, user.mes)
router.get('/usre', user.mes)

export default router;
