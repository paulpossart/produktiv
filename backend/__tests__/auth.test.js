const { signIn, signOut, verifyUser } = require('../queries/auth');
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('signIn', () => {
    let res;
    let next;

    beforeEach(() => {
        res = {
            cookie: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
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

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalledTimes(2);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                user: expect.objectContaining({ username: 'username' })
            })
        )
    })

    it('throws on invalid username', async () => {
        const req = {
            body: {
                username: '<{invalid username}>',
                password: 'password'
            }
        };

        await expect(signIn(req, res, next))
            .rejects.toThrow(/invalid username or password/i);
    })

    it('throws on invalid password', async () => {
        const req = {
            body: {
                username: 'username',
                password: 'p'
            }
        };

        await expect(signIn(req, res, next))
            .rejects.toThrow(/invalid username or password/i);
    })
})


describe('signOut', () => {
    it('clears tokens and sends 204', () => {
        const req = {};
        const res = {
            clearCookie: jest.fn().mockReturnThis(),
            sendStatus: jest.fn()
        };

        signOut(req, res);

        expect(res.clearCookie).toHaveBeenCalledTimes(2);
        expect(res.clearCookie).toHaveBeenCalledWith(
            'accessToken', expect.any(Object)
        );
        expect(res.clearCookie).toHaveBeenCalledWith(
            'refreshToken', expect.any(Object)
        );
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    })
})

describe('verifyUser', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {};
        res = {
            cookie: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    })

    it('gives 200 and a message when no tokens present', async () => {
        req = { cookies: {} };

        const result = await verifyUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            userData: false,
            message: 'No tokens to validate',
            user: null
        })
    })

    it(`creates new access token, sets userId, and
        calls next when refresh token present`, async () => {
        req = { cookies: { refreshToken: 'mock-refresh-token' } };
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'userId' });
        });

        await verifyUser(req, res, next);

        expect(res.cookie).toHaveBeenCalledWith(
            'accessToken', 'mockAccessToken', expect.any(Object)
        );
        expect(req.userId).toBe('userId')
        expect(next).toHaveBeenCalled();
    })

    it(`verifies access token, sets userId, and
        calls next when access token present`, async () => {
        process.env.ACCESS_TOKEN_SECRET = 'test-secret';
        req = { cookies: { accessToken: 'mock-access-token' } };
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'userId' });
        });

        await verifyUser(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(
            'mock-access-token', 'test-secret', expect.any(Function)
        );
        expect(req.userId).toBe('userId')
        expect(next).toHaveBeenCalled();
    })
})
