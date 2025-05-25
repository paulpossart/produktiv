import { Router } from 'express';
import { createTasks, getTasks } from '../queries/tasks.js';
import { verifyUser } from '../queries/auth.js';

const router = Router();

router.post('/', verifyUser, createTasks);
router.get('/', verifyUser, getTasks);
router.put('/', verifyUser, );
router.delete('/', verifyUser, );

export default router;