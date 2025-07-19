import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { changeInput } from '../../utils/helpers';
import { useAuth } from '../../../context/AuthContext';
import CreateUser from './CreateUser';

const mockCallCreateUser = jest.fn();
jest.mock('../../../apiCalls/usersCalls', () => ({
    callCreateUser: (...args) => mockCallCreateUser(...args)
}));

jest.mock('../../../context/AuthContext');

const setSubmitErr = jest.fn();
const handleInputChange = jest.fn((inputType, setter, errSetter) => {
    return (e) => {
        setSubmitErr('');
        changeInput(e, setter, errSetter, inputType)
    }
});

describe('CreateUser', () => {
    beforeEach(() => {
        render(
            <CreateUser
                setView={() => { }}
                setSubmitErr={setSubmitErr}
                handleInputChange={handleInputChange}
            />);
    })

    it('calls callCreateUser with the correct arguments', async () => {
        mockCallCreateUser.mockResolvedValue({ user: 'user' });

        fireEvent.change(screen.getByLabelText(/register a new username/i), { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/register a new password/i), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/confirm your new password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(mockCallCreateUser).toHaveBeenCalledWith('username', 'password', 'password');
        })
    })

    it('checks for input error message on password mismatch', () => {
        fireEvent.change(screen.getByLabelText(/register a new password/i), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/confirm your new password/i), { target: { value: 'pass' } });

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
})