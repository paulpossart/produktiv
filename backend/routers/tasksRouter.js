import { Router } from 'express';
import {
    createTasks,
    getTasks,
    editTasksById,
    prioritiseTasksById,
    deleteTasksById
} from '../queries/tasks.js';
import { verifyUser } from '../queries/auth.js';

const router = Router();

router.post('/', verifyUser, createTasks);
router.get('/', verifyUser, getTasks);
router.put('/:id', verifyUser, editTasksById);
router.patch('/:id', verifyUser, prioritiseTasksById)
router.delete('/:id', verifyUser, deleteTasksById);

export default router;
