import jwt from 'jsonwebtoken';

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

export {
    isProd,
    newErr,
    signAccessToken,
    signRefreshToken,
};
