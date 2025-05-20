import validator from 'validator';
import jwt from 'jsonwebtoken';

const safeRegex = /^[^<>{};\\]*$/;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const isProd = () => process.env.NODE_ENV === 'production';

const isValidUsername = (input) => {
    return (
        typeof input === 'string' &&
        input.trim() &&
        validator.matches(input, safeRegex) &&
        validator.isLength(input, { min: 1, max: 30 })
    );
};

const isValidPassword = (input) => {
    return (
        typeof input === 'string' &&
        validator.isLength(input, { min: 6, max: 30 })
    );
};

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

export {
    isProd,
    isValidUsername,
    isValidPassword,
    signAccessToken,
    signRefreshToken
};
