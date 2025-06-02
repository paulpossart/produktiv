import {Router} from 'express';
import { signIn, signOut } from '../queries/auth.js';
import { rateCheck } from '../queries/helperFunctions.js';

const router = Router();

router.post('/sign-in', rateCheck, signIn);
router.post('/sign-out', signOut);

export default router;
