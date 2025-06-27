import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/config.js';
import {
    isProd,
    newErr,
    signAccessToken,
    signRefreshToken,
    isValidInput
} from '../utils/helpers.js';

const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    if (
        !isValidInput('username', username, 1, 30) ||
        !isValidInput('password', password, 6, 30)
    ) {
        throw newErr('invalid username or password', 401, 'signInError');
    }

    try {
        const result = await pool.query(
            `SELECT * FROM produktiv.users WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            throw newErr('invalid username or password', 401, 'signInError');
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            throw newErr('invalid username or password', 401, 'signInError');
        }

        const accessToken = signAccessToken({ sub: user.id });
        const refreshToken = signRefreshToken({ sub: user.id });

        res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: isProd(),
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json({
                user: {
                    username: user.username,
                    created_at: user.created_at
                }
            });
    } catch (err) {
        next(err);
    }
}

const signOut = (req, res) => {
    res
        .clearCookie('accessToken', {
            httpOnly: true,
            secure: isProd(),
            sameSite: 'lax',
        })
        .clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProd(),
            sameSite: 'lax',
        })
        .sendStatus(204);
};

export { signIn, signOut };
