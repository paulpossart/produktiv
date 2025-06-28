const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/config');
const {
    isProd,
    newErr,
    signAccessToken,
    signRefreshToken,
    isValidInput
} = require('../utils/helpers');

const createUser = async (req, res, next) => {
    const id = uuid4();
    const { newUsername, newPassword, retypedPassword } = req.body;

    if (
        !isValidInput('username', newUsername, 1, 30) ||
        !isValidInput('password', newPassword, 6, 30)
    ) {
        throw newErr('invalid username or password', 401, 'regUserError');
    }

    if (newPassword !== retypedPassword) {
        throw newErr('passwords do not match', 400, 'regUserError');
    }

    try {
        const checkUsername = await pool.query(
            `SELECT * from produktiv.users WHERE username = $1`,
            [newUsername]
        );

        if (checkUsername.rows.length > 0) {
            throw newErr('username unavailable', 409, 'regUserError');
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

module.exports = { createUser };
