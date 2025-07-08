const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/config');
const {
    setCookie,
    delCookie,
    newErr,
    signAccessToken,
    signRefreshToken,
    isValidInput
} = require('../utils/helpers');

const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    if (
        !isValidInput('username', username, 1, 30) ||
        !isValidInput('password', password, 6, 30)
    ) {
        throw newErr('Invalid username or password', 401, 'signInError');
    }

    try {
        const result = await pool.query(
            `SELECT * FROM produktiv.users WHERE username = $1`,
            [username]
        );

        // generic message avoids revealing user details
        if (result.rows.length === 0) {
            throw newErr('invalid username or password', 401, 'signInError');
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            throw newErr('Invalid username or password', 401, 'signInError');
        }
        const accessToken = signAccessToken({ sub: user.id });
        const refreshToken = signRefreshToken({ sub: user.id });

        // set cookies:
        // 15mins for access, 7 days for refresh - 
        // matches JWT age lenghts
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

const signOut = (req, res) => {
    delCookie(res, 'accessToken');
    delCookie(res, 'refreshToken');
    res.sendStatus(204);
};

const verifyUser = (req, res, next) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken && !accessToken) {
        // no tokens = yet to sign in, not an err
        return res.status(200).json({
            userData: false,
            message: 'No tokens to validate',
            user: null
        });
    }

    if (!accessToken) {
        // attempt to get new access token if refresh token present
        return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
            if (err) {
                return next(newErr('Invalid refresh token', 401, 'verificationError'));
            }
            const newAccessToken = signAccessToken({ sub: payload.sub });

            setCookie(res, 'accessToken', newAccessToken, { maxAge: 15 * 60 * 1000 });
            req.userId = payload.sub;
            next();
        });
    }

    // verify access token if present
    return jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
        if (err) {
            // attempt to get new access token if current token invalid 
            return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
                if (err) {
                    return next(newErr('Invalid tokens', 401, 'verificationError'));
                }
                const newAccessToken = signAccessToken({ sub: payload.sub });

                setCookie(res, 'accessToken', newAccessToken, { maxAge: 15 * 60 * 1000 });
                req.userId = payload.sub;
                next();
            });
        }
        req.userId = payload.sub;
        next();
    });
};

module.exports = { signIn, signOut, verifyUser };
