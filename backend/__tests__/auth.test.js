const { signIn, signOut, verifyUser } = require('../queries/auth');
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('signIn', () => {
    let res;
    let next;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    it('returns a user object and sets cookies on success', async () => {
        const req = {
            body: {
                username: 'username',
                password: 'password'
            }
        };

        pool.query.mockResolvedValue({
            rows: [{
                id: 1,
                username: 'username',
                password_hash: 'hashed_password',
                created_at: new Date(),
                updated_at: new Date()
            }]
        });
        bcrypt.compare.mockResolvedValue(true);

        await signIn(req, res, next);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining(`SELECT * FROM produktiv.users`),
            expect.arrayContaining(['username'])
        );
        expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed_password');
        expect(res.cookie).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                user:
                    expect.objectContaining({ username: 'username' })
            })
        );
    });

    it('throws on invalid username', async () => {
        const req = {
            body: {
                username: '<{invalid username}>',
                password: 'password'
            }
        };
        await expect(signIn(req, res, next)).rejects.toThrow(
            expect.objectContaining({
                name: 'signInError',
                status: 401,
                message: 'invalid username or password'
            })
        );
    });

    it('throws on invalid password', async () => {
        const req = {
            body: {
                username: 'username',
                password: 'p'
            }
        };

        await expect(signIn(req, res, next)).rejects.toThrow(
            expect.objectContaining({
                name: 'signInError',
                status: 401,
                message: 'invalid username or password'
            })
        );
    });
});

describe('signOut', () => {
    it('clears tokens and sends 204', () => {
        const res = {
            clearCookie: jest.fn().mockReturnThis(),
            sendStatus: jest.fn()
        };

        const req = {};

        signOut(req, res);

        expect(res.clearCookie).toHaveBeenCalledTimes(2);
        expect(res.clearCookie).toHaveBeenCalledWith('accessToken', expect.objectContaining({
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        }));
        expect(res.clearCookie).toHaveBeenCalledWith('refreshToken', expect.objectContaining({
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        }));
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
});

describe('verifyUser', () => {
    let res;
    let next;
    let req;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    it('responds with 200 and message when there are no tokens', async () => {
        req = { cookies: {} };

        await verifyUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'no tokens to validate'
            })
        )
    });

    it('creates new access token, sets userId, calls next when a refresh token is present', async () => {
        req = { cookies: { refreshToken: 'refresh-token' } };

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'userId' });
        });

        await verifyUser(req, res, next);

        expect(req.userId).toBe('userId');
        expect(next).toHaveBeenCalled();
    });

    it('verifies access token, sets userId, calls next when access token is present', async () => {
        req = { cookies: { accessToken: 'access-token' } };

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'userId' });
        });

        await verifyUser(req, res, next);

        expect(req.userId).toBe('userId');
        expect(next).toHaveBeenCalled();
    });

    it('passes the errors to next when access token is bad', async () => {
        req = { cookies: { accessToken: 'bad-access-token' } };

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error(), null);
        });

        await verifyUser(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
