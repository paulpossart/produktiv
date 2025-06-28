const request = require('supertest');
const app = require('../app');
const pool = require('../db/config');
const bcrypt = require('bcrypt');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');

describe('auth routes', () => {
    it('should sign in and set cookies', async () => {
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

        const response = await request(app)
            .post('/api/auth/sign-in')
            .send({ username: 'username', password: 'password' })
            .expect(200)

        expect(response.body.user).toEqual(expect.objectContaining({
            username: 'username'
        }));

        const cookies = response.headers['set-cookie'];

        expect(cookies).toBeDefined();
        expect(cookies.length).toBe(2);
    })

    it('should sign out clear cookies', async () => {
        const response = await request(app)
            .post('/api/auth/sign-out')
            .expect(204);

        const cookies = response.headers['set-cookie'];

        expect(cookies).toBeDefined();
        expect(cookies.length).toBe(2);
    });
});

describe('users routes', () => {
    it('should create a new user and set cookies', async () => {
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

        const response = await request(app)
            .post('/api/users/')
            .send({ newUsername: 'username', newPassword: 'password', retypedPassword: 'password' })
            .expect(200)

        expect(response.body.user).toEqual(expect.objectContaining({
            username: 'username'
        }));

        const cookies = response.headers['set-cookie'];

        expect(cookies).toBeDefined();
        expect(cookies.length).toBe(2);
    })
});
