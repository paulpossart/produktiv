const { createUser, getUser } = require('../queries/users');
const pool = require('../db/config');
const bcrypt = require('bcrypt');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');
/*
describe('createUser', () => {
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
                newUsername: 'username',
                newPassword: 'password',
                retypedPassword: 'password'
            }
        };

        pool.query
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({
                rows: [{
                    id: 1,
                    username: 'username',
                    password_hash: 'hashed_password',
                    created_at: new Date(),
                    updated_at: new Date()
                }]
            });

        await createUser(req, res, next);

        expect(pool.query).toHaveBeenCalledTimes(2);
        expect(pool.query).toHaveBeenNthCalledWith(2,
            expect.stringContaining('INSERT INTO produktiv.users'),
            expect.arrayContaining(['username', 'mock_hash_value'])
        );
        expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
        expect(res.cookie).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                user:
                    expect.objectContaining({ username: 'username' })
            })
        );
    });

    it('throws on  invalid username', async () => {
        const req = {
            body: {
                newUsername: '<{invalid username}>',
                newPassword: 'password'
            }
        };
        await expect(createUser(req, res, next)).rejects.toThrow(
            expect.objectContaining({
                name: 'regUserError',
                status: 401,
                message: 'invalid username or password'
            })
        );
    });

    it('throws on  invalid password', async () => {
        const req = {
            body: {
                newUsername: 'username',
                newPassword: 'p'
            }
        };
        await expect(createUser(req, res, next)).rejects.toThrow(
            expect.objectContaining({
                name: 'regUserError',
                status: 401,
                message: 'invalid username or password'
            })
        );
    });

    it('throws on  unmatched password', async () => {
        const req = {
            body: {
                newUsername: 'username',
                newPassword: 'password',
                retypedPassword: 'retypedPassword'
            }
        };
        await expect(createUser(req, res, next)).rejects.toThrow(
            expect.objectContaining({
                name: 'regUserError',
                status: 400,
                message: 'passwords do not match'
            })
        );
    });

    it('passes error on unavailable username', async () => {
        const req = {
            body: {
                newUsername: 'username',
                newPassword: 'password',
                retypedPassword: 'password'
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

        await createUser(req, res, next);

        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                status: 409,
                name: 'regUserError',
                message: 'username unavailable'
            })
        );
    });
});
*/
describe('getUser', () => {
    let req;
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

    it('returns user data on success', async () => {
        req = { userId: 1 };

        pool.query.mockResolvedValue({
            rows: [{
                id: 1,
                username: 'username',
                password_hash: 'hashed_password',
                created_at: new Date(),
                updated_at: new Date()
            }]
        });

        await getUser(req, res, next);

        expect(pool.query).toHaveBeenCalled();
        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('SELECT username, created_at FROM produktiv.users'),
            expect.arrayContaining([1])
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                user:
                    expect.objectContaining({ username: 'username' })
            })
        );
    });

    it('passes error to next when no user is found', async () => {
        req = { userId: 1 };

        pool.query.mockResolvedValue({
            rows: []
        });

        await getUser(req, res, next);

        expect(pool.query).toHaveBeenCalled();
        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('SELECT username, created_at FROM produktiv.users'),
            expect.any(Array)
        );
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});