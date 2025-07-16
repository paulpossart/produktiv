const request = require('supertest');
const app = require('../app');
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

//================================================================================
// AUTH ROUTES
//================================================================================

describe('auth routes', () => {
    it('returns 200 on sign in and returns user', async () => {
        pool.query.mockResolvedValue({
            rows: [{
                id: 1,
                username: 'username',
                password_hash: 'hashed_password',
                created_at: 'date',
            }]
        });
        bcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
            .post('/api/auth/sign-in')
            .send({ username: 'username', password: 'password' })
            .expect(200);

        expect(response.body.user).toEqual({
            username: 'username',
            created_at: 'date'
        });
    })

    it('returns 204 on sign out', async () => {
        await request(app)
            .post('/api/auth/sign-out')
            .expect(204);
    })
})

//================================================================================
// USERS ROUTES
//================================================================================

describe('users routes', () => {
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

        jest.clearAllMocks();
    })

    it('creates and returns a new user', async () => {
        const mockClient = {
            query: jest.fn(),
            release: jest.fn()
        };

        pool.connect = jest.fn().mockResolvedValue(mockClient);

        mockClient.query
            // mock BEGIN
            .mockResolvedValueOnce()
            // mock username check
            .mockResolvedValueOnce({ rows: [] })
            //mock new user INSERT
            .mockResolvedValueOnce({
                rows: [{
                    id: 1,
                    username: 'username',
                    password_hash: 'hashed_password',
                    created_at: 'date',
                }]
            })
            // mock task INSERT
            .mockResolvedValueOnce({ rows: [] })
            // mock COMMIT
            .mockResolvedValueOnce();

        const response = await request(app)
            .post('/api/users')
            .send({
                newUsername: 'username',
                newPassword: 'password',
                retypedPassword: 'password'
            })
            .expect(200);

        expect(response.body.user).toEqual({
            username: 'username',
            created_at: 'date'
        });
    })

    it('gets the user', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query.mockResolvedValue({
            rows: [{
                id: 1,
                username: 'username',
                created_at: 'date',
            }]
        });

        const response = await request(app)
            .get('/api/users')
            .set('Cookie', ['accessToken=mock-access-token'])
            .expect(200);

        expect(response.body.user).toEqual({
            username: 'username',
            created_at: 'date',
        })
    })

    it('returns an updated username', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query
            .mockResolvedValueOnce({ rows: [{ username: 'old username' }] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({
                rows: [{
                    username: 'new username',
                    created_at: 'date',
                }]
            });

        bcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
            .patch('/api/users/update-username')
            .set('Cookie', ['accessToken=mock-access-token'])
            .send({
                newUsername: 'new username',
                password: 'password',
            })
            .expect(200);

        expect(response.body.user).toEqual({
            username: 'new username',
            created_at: 'date'
        })
    })

    it('updates password', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query
            .mockResolvedValueOnce({
                rows: [{
                    username: 'username',
                    password_hash: 'mock-hash'
                }]
            })
            .mockResolvedValueOnce({ rows: [] })

        bcrypt.compare.mockResolvedValue(true);

        await request(app)
            .patch('/api/users/update-password')
            .set('Cookie', ['accessToken=mock-access-token'])
            .send({
                currentPassword: 'old password',
                newPassword: 'new password',
                confirmPassword: 'new password'
            })
            .expect(200);

        expect(pool.query).toHaveBeenNthCalledWith(2,
            `UPDATE produktiv.users
             SET password_hash = $1
             WHERE id = $2`,
            ['mock_hash_value', 'mock-user-id']
        )
    })

    it('deletes user', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query.mockResolvedValue({ rows: [] })

        await request(app)
            .delete('/api/users')
            .set('Cookie', ['accessToken=mock-access-token'])
            .expect(200);

        expect(pool.query).toHaveBeenCalledWith(
            `DELETE FROM produktiv.users WHERE id = $1`,
            ['mock-user-id']
        )
    })
})

//================================================================================
// TASKS ROUTES
//================================================================================