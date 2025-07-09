const { Router } = require('express');
const {
    createTask,
    getTasks,
    editTasksById,
    prioritiseTasksById,
    deleteTasksById
} = require('../queries/tasks');

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', editTasksById);
router.patch('/:id', prioritiseTasksById);
router.delete('/:id', deleteTasksById);

module.exports = router;
