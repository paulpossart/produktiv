import jwt from 'jsonwebtoken';
import validator from 'validator';

const isProd = () => process.env.NODE_ENV === 'production';

const newErr = (message, status = 500, name = 'Error') => {
    const err = new Error(message);
    err.status = status;
    err.name = name;
    return err;
}

// JWT helpers================================================

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const signAccessToken = (payload) => {
    return jwt.sign(payload, accessTokenSecret, {
        expiresIn: '15m'
    });
};

const signRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenSecret, {
        expiresIn: '7d'
    });
};

//============================================================

const isValidInput = (type, input, min, max) => {
    const safeRegex = /^[^<>{};\\]*$/;
    if (typeof input !== 'string' || !validator.isLength(input, { min, max })) return false;
    if (type === 'password') return true;
    if (!input.trim() || !validator.matches(input, safeRegex)) return false;
    if (type === 'username') return true;
    return false
};

export {
    isProd,
    newErr,
    signAccessToken,
    signRefreshToken,
    isValidInput
};
