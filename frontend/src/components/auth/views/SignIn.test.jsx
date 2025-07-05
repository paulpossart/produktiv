import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockSignIn } from '../../../context/AuthContext';
import { changeInput } from '../../utils/helpers';
import SignIn from './SignIn';

jest.mock('../../../context/AuthContext');

const setSubmitErr = jest.fn();
const handleInputChange = jest.fn((inputType, setter, errSetter) => {
    return (e) => {
        setSubmitErr('');
        changeInput(e, setter, errSetter, inputType)
    }
});

describe('SignIn', () => {
    it('calls sign in with expected args', async () => {
        mockSignIn.mockResolvedValue({ user: 'user' });

        render(<SignIn setView={() => { }} setSubmitErr={setSubmitErr} handleInputChange={handleInputChange} />);
        
        fireEvent.change(screen.getByLabelText(/enter username/i), { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/enter password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));


        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith('username', 'password');
        });
    });

    it('checks for input error message on invalid username', () => {
        render(<SignIn setView={() => { }} setSubmitErr={setSubmitErr} handleInputChange={handleInputChange} />);

        fireEvent.change(screen.getByLabelText(/enter username/i), { target: { value: '<{username}>' } });
        expect(screen.getByText(/username cannot contain/i)).toBeInTheDocument();
    });
});