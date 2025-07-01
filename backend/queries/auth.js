const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/config');
const {
    isProd,
    setCookie,
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

const verifyUser = (req, res, next) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken && !accessToken) {
        return res.status(200).json({
            userData: false,
            message: 'no tokens to validate',
            user: null
        });
    }

    if (!accessToken) {
        return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
            if (err) {
                 return next(newErr('invalid refresh token', 401, 'verificationError'));
            }
            const newAccessToken = signAccessToken({ sub: payload.sub });

            setCookie(res, 'accessToken', newAccessToken, { maxAge: 15 * 60 * 1000 });
            req.userId = payload.sub;
            next();
        });
    }

    return jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
        if (err) {
            return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
                if (err) {
                    return next(newErr('invalid tokens', 401, 'verificationError'));
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
