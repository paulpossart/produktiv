const {
    createTask, getTasks, editTasksById, prioritiseTasksById, deleteTasksById
} = require('../queries/tasks');
const pool = require('../db/config');

jest.mock('../db/config');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('createTask', () => {
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    let req = {
        body: {
            title: 'task 1',
            description: 'task body',
            firstTaskId: 1
        },
        userId: 'mock-user-id'
    };
    let next = jest.fn();

    it('creates a new task', async () => {
        pool.query
            .mockResolvedValueOnce({ rows: [{ priority: 100 }] })
            .mockResolvedValueOnce({ rows: [{ title: 'task 1' }] });

        await createTask(req, res, next)

        expect(pool.query).toHaveBeenNthCalledWith(2,
            `INSERT INTO produktiv.tasks
             (user_id, title, description, priority)
             VALUES ($1, $2, $3, $4)
             RETURNING title`,
            ['mock-user-id', 'task 1', 'task body', 200]
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: `Task 'task 1' successfully created`
        });
    })
})

describe('getTasks', () => {
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    let req = {};
    let next = jest.fn();

    it('successfully returns tasks', async () => {
        pool.query
            .mockResolvedValueOnce({})
            .mockResolvedValueOnce({ rows: [{ taskArr: 'successfully returned' }] });

        await getTasks(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{
            taskArr: 'successfully returned'
        }]);
    })
})

describe('editTasksById', () => {
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    let req = {
        body: {
            newTitle: 'new-task',
            newDescription: 'new-task-body',
        },
        userId: 'mock-user-id',
        params: {
            id: 11
        }
    };
    let next = jest.fn();

    it('successfully edits task', async () => {
        pool.query.mockResolvedValue();

        await editTasksById(req, res, next);

        expect(pool.query).toHaveBeenCalledWith(
            `UPDATE produktiv.tasks
             SET title = $1, description = $2
             WHERE id = $3 AND user_id = $4`,
            ['new-task', 'new-task-body', 11, 'mock-user-id']
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: `Task 'new-task' succesfully edited`
        })
    })
})

describe('prioritiseTasksById', () => {
    let res = {
        sendStatus: jest.fn().mockReturnThis(),
    };
    let req = {
        body: {
            operator: '+',
            adjacentTaskId: 100,
            adjacentAdjacentTaskId: 200
        },
        userId: 'mock-user-id',
        params: {
            id: 11
        }
    };
    let next = jest.fn();

    it('successfully reprioritises task', async () => {

        pool.query
            .mockResolvedValueOnce({ rows: [{ priority: 100 }] })
            .mockResolvedValueOnce({ rows: [{ priority: 200 }] })
            .mockResolvedValueOnce();

        await prioritiseTasksById(req, res, next);

        expect(pool.query).toHaveBeenNthCalledWith(3,
            `UPDATE produktiv.tasks
             SET priority = $1
             WHERE id = $2 AND user_id = $3`,
            [150, 11, 'mock-user-id']
        );
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    })
})

describe('deleteTasksById', () => {
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    let req = {
        userId: 'mock-user-id',
        params: {
            id: 11
        }
    };
    let next = jest.fn();

    it('successfully deletes task', async () => {

        pool.query.mockResolvedValue();

        await deleteTasksById(req, res, next);

        expect(pool.query).toHaveBeenCalledWith(
            `DELETE FROM produktiv.tasks
             WHERE id = $1 AND user_id = $2`,
            [11, 'mock-user-id']
        );
        expect(res.status).toHaveBeenCalledWith(200);
    })
})