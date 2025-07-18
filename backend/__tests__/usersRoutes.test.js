const request = require('supertest');
const app = require('../app');
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

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
            .mockResolvedValueOnce() // mock BEGIN
            .mockResolvedValueOnce({ rows: [] })  // mock username check
            .mockResolvedValueOnce({  //mock new user INSERT
                rows: [{
                    username: 'username',
                    created_at: 'date',
                }]
            })
            .mockResolvedValueOnce({ rows: [] })  // mock task INSERT
            .mockResolvedValueOnce();   // mock COMMIT

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
