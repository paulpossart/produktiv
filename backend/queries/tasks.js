import { isValidInput } from './helperFunctions.js';
import pool from '../db/config.js';

const createTasks = async (req, res, next) => {
    const userId = req.userId;
    const { title, description, prevId } = req.body;
    let newPriority = 100;

    if (!isValidInput('title', title, 1, 100)
        || !isValidInput('description', description, 0, 500)) {
        return res.status(400).json({
            success: false,
            message: 'invalid title or description.'
        })
    }

    try {
        if (prevId) {
            const result = await pool.query(
                `SELECT priority FROM produktiv.tasks
                 WHERE id = $1 AND user_id = $2`,
                [prevId, userId]
            );

            if (result.rows.length > 0) {
                const prevPriority = result.rows[0].priority;
                newPriority += prevPriority;
            }
        }

        const result = await pool.query(
            `INSERT INTO produktiv.tasks
             (user_id, title, description, priority)
             VALUES ($1, $2, $3, $4)
             RETURNING title`,
            [userId, title, description, newPriority]
        );

        const newTitle = result.rows[0].title

        res.status(201).json({
            success: true,
            message: `Task '${newTitle}' succesfully created`
        });

    } catch (err) {
        next(err);
    }
};

const getTasks = async (req, res, next) => {
    const userId = req.userId;

    try {
        const result = await pool.query(
            `SELECT id, title, description, priority
            FROM produktiv.tasks
            WHERE user_id = $1
            ORDER BY priority DESC`,
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

const editTasksById = async (req, res, next) => {
    const userId = req.userId;
    const taskId = parseInt(req.params.id)
    const { newTitle, newDescription } = req.body;

    if (!isValidInput('title', newTitle, 1, 100)
        || !isValidInput('description', newDescription, 0, 500)) {
        return res.status(400).json({
            success: false,
            message: 'invalid title or description.'
        })
    };

    try {
        await pool.query(
            `UPDATE produktiv.tasks
             SET title = $1, description = $2
             WHERE id = $3 AND user_id = $4`,
            [newTitle, newDescription, taskId, userId]
        );
        res.status(201).json({
            success: true,
            message: `Task '${newTitle}' succesfully edited`
        });
    } catch (err) {
        next(err);
    }
};

const prioritiseTasksById = async (req, res, next) => {
    const userId = req.userId;
    const taskId = parseInt(req.params.id);
    const { operator, adjacentTaskId } = req.body;

    if (operator !== '+' && operator !== '-') {
        return res.sendStatus(400)
    }
    try {
        const result = await pool.query(
            `SELECT priority FROM produktiv.tasks
             WHERE id = $1 AND user_id = $2`,
            [adjacentTaskId, userId]
        );

        const adjPriority = result.rows[0].priority;

        const newPriority = operator === '+'
            ? adjPriority + 1
            : adjPriority - 1;

        await pool.query(
            `UPDATE produktiv.tasks
                 SET priority = $1
                 WHERE id = $2 AND user_id = $3`,
            [newPriority, taskId, userId]
        );
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

const deleteTasksById = async (req, res, next) => {
    const userId = req.userId;
    const taskId = parseInt(req.params.id);

    try {
        await pool.query(
            `DELETE FROM produktiv.tasks
             WHERE id = $1 AND user_id = $2`,
            [taskId, userId]
        );
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

export {
    createTasks,
    getTasks,
    editTasksById,
    prioritiseTasksById,
    deleteTasksById
};
