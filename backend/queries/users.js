const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require('../db/config');
const {
    setCookie,
    delCookie,
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
        throw newErr('Invalid username or password', 401, 'regUserError');
    }

    if (newPassword !== retypedPassword) {
        throw newErr('Passwords do not match', 400, 'regUserError');
    }

    try {
        const checkUsername = await pool.query(
            `SELECT * from produktiv.users WHERE username = $1`,
            [newUsername]
        );

        // might give away usernames, so number of attempts
        // is limited in route...
        if (checkUsername.rows.length > 0) {
            throw newErr('Username unavailable', 409, 'regUserError');
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

        setCookie(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
        setCookie(res, 'refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({
            user: {
                username: user.username,
                created_at: user.created_at
            }
        });
    } catch (err) {
        next(err);
    }
}

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
            throw newErr('Could not find user', 404, 'getUserError');
        }
        return res.status(200).json({
            userData: true,
            message: 'userdata successfully retrieved',
            user: {
                username: user.username,
                created_at: user.created_at
            }
        });

    } catch (err) {
        next(err);
    }
};

const updateUsername = async (req, res, next) => {
    const userId = req.userId;
    const { newUsername, password } = req.body;

    if (
        !isValidInput('username', newUsername, 1, 30) ||
        !isValidInput('password', password, 6, 30)
    ) {
        throw newErr('Invalid username or password', 401, 'updatUsernameError');
    }

    try {
        // Find user
        const isUser = await pool.query(
            `SELECT * FROM produktiv.users WHERE id =$1`,
            [userId]
        );

        if (isUser.rows.length === 0) {
            throw newErr('Could not find user details', 401, 'updatUsernameError');
        }

        const user = isUser.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            throw newErr('Invalid password', 401, 'updatUsernameError');
        }

        // Check availability of new username
        const nameAvailable = await pool.query(
            `SELECT * FROM produktiv.users WHERE username = $1`,
            [newUsername]
        );

        if (nameAvailable.rows.length > 0) {
            throw newErr('Username unavailable', 409, 'updatUsernameError')
        }

        // Set new username
        const result = await pool.query(
            `UPDATE produktiv.users
             SET username = $1
             WHERE id = $2
             RETURNING username, created_at`,
            [newUsername, userId]
        );

        const updatedUser = result.rows[0];

        res.status(200).json({
            success: true,
            message: `Username updated to: ${updatedUser.username}`,
            user: updatedUser
        });

    } catch (err) {
        next(err);
    }
};

const updatePasword = async (req, res, next) => {
    const userId = req.userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!isValidInput('password', currentPassword, 6, 30)) {
        throw newErr('Current password incorrect', 400, 'updatePaswordError');
    }

    if (!isValidInput('password', newPassword, 6, 30) ||
        newPassword !== confirmPassword) {
        throw newErr('New password invalid, or does not match', 400, 'updatePaswordError');
    };

    try {
        const result = await pool.query(
            `SELECT * FROM produktiv.users WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            throw newErr('Could not find user', 401, 'updatePaswordError');
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isMatch) {
            throw newErr('Current password invalid', 401, 'updatePaswordError');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await pool.query(
            `UPDATE produktiv.users
             SET password_hash = $1
             WHERE id = $2`,
            [hashedPassword, userId]
        );

        delCookie(res, 'accessToken');
        delCookie(res, 'refreshToken');
        res.status(200).json({
            success: true,
            message: 'Password updated. Please sign in again',
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        await pool.query(
            `DELETE FROM produktiv.users WHERE id = $1`,
            [userId]
        );

        delCookie(res, 'accessToken');
        delCookie(res, 'refreshToken');
        res.status(200).json({
            success: true,
            message: 'user successfully deleted'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { createUser, getUser, updateUsername, updatePasword, deleteUser };
