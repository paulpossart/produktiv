import { Router } from 'express';
import { createUser } from '../queries/users.js';

const router = Router();

router.post('/', createUser);

export default router;
