import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcrypt';
import pool from '../db/config.js';
import {
    isProd,
    isValidUsername,
    isValidPassword,
    signAccessToken,
    signRefreshToken
} from './helperFunctions.js';

const createUser = async (req, res, next) => {
    const id = uuid4();
    const { newUsername, newPassword } = req.body;

    if (!isValidUsername(newUsername) || !isValidPassword(newPassword)) {
        return res.status(400).json({
            success: false,
            message: 'invalid username or password'
        })
    };

    try {
        const checkUsername = await pool.query(
            `SELECT * from produktiv.users WHERE username = $1`,
            [newUsername]
        );

        if (checkUsername.rows.length > 0) {
            return res.status(409).json({
                success: false,
                name: 'Conflict',
                message: 'username unavailable'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const result = await pool.query(
            `INSERT INTO produktiv.users (id, username, password_hash)
                 VALUES ($1, $2, $3) RETURNING id, username, created_at`,
            [id, newUsername, hashedPassword]
        )
        const user = result.rows[0];
        const accessToken = signAccessToken({ sub: id });
        const refreshToken = signRefreshToken({ sub: id });

        res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json({
                success: true,
                user: {
                    username: user.username,
                    created_at: user.created_at
                }
            });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        const result = await pool.query(
            `SELECT username, created_at FROM produktiv.users
             WHERE id = $1`,
            [userId]
        );
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        next(err);
    }
};

export {
    createUser,
    getUser
};
