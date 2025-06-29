import { callCreateUser } from './usersCalls';

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('callCreateUser', () => {
    it('returns new user data on success', async () => {
        const mockData = {
            user: {
                username: 'username',
                created_at: new Date()
            }
        };
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const response = await callCreateUser('newUsername', 'newPassword', 'newPassword');

        expect(fetch).toHaveBeenCalledWith('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                newUsername: 'newUsername',
                newPassword: 'newPassword',
                retypedPassword: 'newPassword'
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        expect(response).toEqual(mockData);
    });

    it('throws on bad response', async () => {
        const errMsg = { message: 'invalid username or password' };

        fetch.mockResolvedValue({
            ok: false,
            json: async () => errMsg
        });

        await expect(callCreateUser('bad-username', 'bad-password', 'diff-password'))
            .rejects.toThrow('invalid username or password');

        expect(fetch).toHaveBeenCalledWith('/api/users', expect
            .any(Object));
    });
});
