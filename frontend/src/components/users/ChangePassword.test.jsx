import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { callUpdatePassword } from '../../apiCalls/usersCalls';
import { mockRenderFeedbackModal } from '../../context/ModalContext';
import { mockSetOnClose } from '../../context/ModalContext';
import ChangePassword from './ChangePassword';

jest.mock('../../apiCalls/usersCalls');
jest.mock('../../context/ModalContext');
jest.mock('../../context/AuthContext');

describe('ChangePassword', () => {
    it('successfully updates password', async () => {
        render(
            <MemoryRouter>
                <ChangePassword />
            </MemoryRouter>
        );
        callUpdatePassword.mockResolvedValue({
            success: true,
            message: 'Password updated. Please sign in again',
        });

        fireEvent.change(screen.getByLabelText(/enter current password/i),
            { target: { value: 'current-password' } });
        fireEvent.change(screen.getByLabelText(/enter new password/i),
            { target: { value: 'new-password' } });
        fireEvent.change(screen.getByLabelText(/confirm new password/i),
            { target: { value: 'new-password' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(callUpdatePassword).toHaveBeenCalledWith('current-password', 'new-password', 'new-password');
            expect(mockRenderFeedbackModal).toHaveBeenCalledWith('Password updated. Please sign in again');
            expect(mockSetOnClose).toHaveBeenCalledWith(expect.any(Function))
        });
    })
})