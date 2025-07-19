import { fireEvent, render, screen } from '@testing-library/react';
import { mockSignIn } from '../../context/AuthContext';
import AuthPage from './AuthPage';

jest.mock('../../context/AuthContext');

beforeEach(() => {
    render(<AuthPage />)
})

describe('AuthPage', () => {
    it('renders SignIn by default', () => {
        expect(screen.getByText(/sign in form/i)).toBeInTheDocument();
        expect(screen.queryByText(/user registration form/i)).not.toBeInTheDocument();
    })

    it('changes view on click', () => {
        expect(screen.getByText(/sign in form/i)).toBeInTheDocument();
        expect(screen.queryByText(/user registration form/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(/sign up/i));
        expect(screen.getByText(/user registration form/i)).toBeInTheDocument();
        expect(screen.queryByText(/sign in form/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(/back to sign in/i));
        expect(screen.getByText(/sign in form/i)).toBeInTheDocument();
        expect(screen.queryByText(/user registration form/i)).not.toBeInTheDocument();
    })

    it('announces view change politely', () => {
        expect(screen.getByText(/you are on the sign in page/i)).toBeInTheDocument();
        expect(screen.queryByText(/you are on the user registration page/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(/sign up/i));
        expect(screen.getByText(/you are on the user registration page/i)).toBeInTheDocument();
        expect(screen.queryByText(/you are on the sign in page/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(/back to sign in/i));
        expect(screen.getByText(/you are on the sign in page/i)).toBeInTheDocument();
        expect(screen.queryByText(/you are on the user registration page/i)).not.toBeInTheDocument();
    })

    it('passes error message to the Duk component', async () => {
        mockSignIn.mockImplementation(() => {
            throw new Error('Incorrect password')
        })

        fireEvent.change(screen.getByLabelText(/enter username/i),
            { target: { value: '<>' } })
        fireEvent.change(screen.getByLabelText(/enter password/i),
            { target: { value: 'pass' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        expect(screen.getByRole('alert'))
            .toHaveTextContent(/invalid username or password/i);
    })
})