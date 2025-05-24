import { Router } from 'express';
import { createTask } from '../queries/tasks.js';
import { verifyUser } from '../queries/auth.js';

const router = Router();

router.post('/', verifyUser, createTask);
router.get('/', verifyUser, );
router.put('/', verifyUser, );
router.delete('/', verifyUser, );

export default router;