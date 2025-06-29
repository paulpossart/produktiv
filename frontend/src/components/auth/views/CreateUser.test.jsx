import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateUser from './CreateUser';

const mockCallCreateUser = jest.fn();

jest.mock('../../../apiCalls/usersCalls', () => ({
    callCreateUser: (...args) => mockCallCreateUser(...args)
}));

jest.mock('../../../context/AuthContext', () => ({
    useAuth: () => ({
        setUser: jest.fn()
    }),
}))

describe('CreateUser', () => {
    it('calls callCreateUser with correct args', async () => {
        mockCallCreateUser.mockResolvedValue({ user: 'user' });

        render(<CreateUser setView={() => { }} setSubmitErr={() => { }} />);
        fireEvent.change(screen.getByLabelText(/register a new username/i), { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/register a new password/i), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/re-enter your new password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        
        await waitFor(() => {
            expect(mockCallCreateUser).toHaveBeenCalledWith('username', 'password', 'password');
        });

    });

    it('checks for input error message on password mismatch', () => {
        render(<CreateUser setView={() => { }} setSubmitErr={() => { }} />);
        fireEvent.change(screen.getByLabelText(/register a new username/i), { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/register a new password/i), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/re-enter your new password/i), { target: { value: 'pass' } });

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
});