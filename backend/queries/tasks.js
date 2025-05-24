import { isValidInput } from './helperFunctions.js';
import pool from '../db/config.js';

const createTask = async (req, res, next) => {
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
       console.log('Inserting task with:', userId, title, description, newPriority);
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

export {createTask};
