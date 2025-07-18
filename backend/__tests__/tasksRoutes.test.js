const request = require('supertest');
const app = require('../app');
const pool = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../db/config');
jest.mock('../utils/helpers');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('tasks routes', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {};
        res = {};
        next = {};

        jest.clearAllMocks();
    })

    it('creates a new task', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [{ title: 'mock-title' }] })

        const response = await request(app)
            .post('/api/tasks')
            .set('Cookie', ['accessToken=mock-access-token'])
            .send({
                title: 'mock-title',
                description: 'mock-desc',
                firstTaskId: 100
            })
            .expect(201);

        expect(pool.query).toHaveBeenNthCalledWith(2,
            `INSERT INTO produktiv.tasks
             (user_id, title, description, priority)
             VALUES ($1, $2, $3, $4)
             RETURNING title`,
            ['mock-user-id', 'mock-title', 'mock-desc', 100]
        )
    })

    it('gets tasks', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query
            .mockResolvedValueOnce()
            .mockResolvedValueOnce({ rows: [{ mockTask: 'mock-task' }] });

        const response = await request(app)
            .get('/api/tasks')
            .set('Cookie', ['accessToken=mock-access-token'])
            .expect(200);

        expect(pool.query).toHaveBeenNthCalledWith(2,
            `SELECT id, title, description, priority
             FROM produktiv.tasks
             WHERE user_id = $1
             ORDER BY priority DESC`,
            ['mock-user-id']
        )
        expect(response.body).toEqual([{ mockTask: 'mock-task' }])
    })

    it('edits tasks by id', async () => {
        const taskId = 1;

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query.mockResolvedValue()


        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Cookie', ['accessToken=mock-access-token'])
            .send({
                newTitle: 'mock-new-title',
                newDescription: 'mock-new-desc'
            })
            .expect(201);

        expect(pool.query).toHaveBeenCalledWith(
            `UPDATE produktiv.tasks
             SET title = $1, description = $2
             WHERE id = $3 AND user_id = $4`,
            ['mock-new-title', 'mock-new-desc', 1, 'mock-user-id']
        )
        expect(response.body).toEqual(expect.objectContaining(
            {
                success: true,
                message: `Task 'mock-new-title' succesfully edited`
            }))
    })

    it('reprioritises tasks by id', async () => {
        const taskId = 1;

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query
            .mockResolvedValueOnce({ rows: [{ priority: 100 }] })
            .mockResolvedValueOnce({ rows: [{ priority: 200 }] })
            .mockResolvedValueOnce()

        const response = await request(app)
            .patch(`/api/tasks/${taskId}`)
            .set('Cookie', ['accessToken=mock-access-token'])
            .send({
                operator: '+',
                adjacentTaskId: 1,
                adjacentAdjacentTaskId: 2
            })
            .expect(204);

        expect(pool.query).toHaveBeenNthCalledWith(3,
            `UPDATE produktiv.tasks
             SET priority = $1
             WHERE id = $2 AND user_id = $3`,
            [150, 1, 'mock-user-id']
        )
    })


    it('deletes tasks by id', async () => {
        const taskId = 1;

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { sub: 'mock-user-id' });
        });

        pool.query.mockResolvedValueOnce();

        const response = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Cookie', ['accessToken=mock-access-token'])
            .expect(200);

        expect(pool.query).toHaveBeenCalledWith(
            `DELETE FROM produktiv.tasks
             WHERE id = $1 AND user_id = $2`,
            [1, 'mock-user-id']
        )
    })
})
