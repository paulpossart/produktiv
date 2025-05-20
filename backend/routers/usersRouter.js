import {Router} from 'express';
import { createUser, getUser } from '../queries/users.js';
import { verifyUser } from '../queries/auth.js';

const router = Router();

router.post('/', createUser);
router.get('/', verifyUser, getUser);

export default router;
