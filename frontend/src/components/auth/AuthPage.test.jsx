import { fireEvent, render, screen } from '@testing-library/react';
import AuthPage from './AuthPage';

jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({
        signIn: jest.fn(() => { throw new Error('Incorrect password') }),
    }),
}));

describe('AuthPage', () => {
    it('renders SignIn by default', () => {
        render(<AuthPage />);
        expect(screen.getByText(/sign in form/i)).toBeInTheDocument();
    });

    it('passes error message to Duk', async () => {
        render(<AuthPage />);
        fireEvent.change(screen.getByLabelText(/enter username/i), { target: { value: '<>' } });
        fireEvent.change(screen.getByLabelText(/enter password/i), { target: { value: 'pass' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        expect(screen.getByRole('alert')).toHaveTextContent(/invalid username or password/i);
    });

    it('announces view change politely', () => {
        render(<AuthPage />);
        expect(screen.getByText(/you are on the sign in page/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/go to user registration/i));
        expect(screen.getByText(/you are on the user registration page/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/go back to sign in/i));
        expect(screen.getByText(/you are on the sign in page/i)).toBeInTheDocument();
    });

    it('changes view onClick', () => {
        render(<AuthPage />);
        expect(screen.getByText(/sign in form/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/go to user registration/i));
        expect(screen.getByText(/user registration form/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/go back to sign in/i));
        expect(screen.getByText(/sign in form/i)).toBeInTheDocument();
    });
})
