import { callSignIn, callSignOut } from './authCalls';

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('callSignIn', () => {
    it('returns user data on success', async () => {
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

        const response = await callSignIn('username', 'password');

        expect(fetch).toHaveBeenCalledWith('/api/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({
                username: 'username',
                password: 'password',
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        expect(response).toEqual(mockData);
    });

    it('throws on bad response', async () => {
        const errMsg = { message: 'invalid username or password' };

        fetch.mockResolvedValue({
            ok: false,
            json: async () => errMsg
        });

        await expect(callSignIn('wrong-username', 'wrong-password'))
            .rejects.toThrow('invalid username or password');

        expect(fetch).toHaveBeenCalledWith('/api/auth/sign-in', expect
            .any(Object));
    });
});

describe('callSignOut', () => {
    it('resolves null on success', async () => {
        fetch.mockResolvedValue({ ok: true });

        await expect(callSignOut()).resolves.toBeNull();

        expect(fetch).toHaveBeenCalledWith('/api/auth/sign-out', {
            method: 'POST',
            credentials: 'include'
        });
    });

    it('throws on failure', async () => {
        fetch.mockResolvedValue({ ok: false })

        await expect(callSignOut()).rejects
            .toThrow('Could not sign out, please try again');

        expect(fetch).toHaveBeenCalledWith('/api/auth/sign-out', expect
            .any(Object));
    });
});
