const request = require('supertest');
const app = require('../app');
const pool = require('../db/config');
const bcrypt = require('bcrypt');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');

describe('auth routes', () => {
    it('returns user on sign in', async () => {
        pool.query.mockResolvedValue({
            rows: [{
                username: 'username',
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
