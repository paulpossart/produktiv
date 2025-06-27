import { Router } from 'express';
import { signIn, signOut } from '../queries/auth.js';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;
