import { Router } from 'express';
import { signIn } from '../queries/auth.js';

const router = Router();

router.post('/sign-in', signIn);

export default router;
