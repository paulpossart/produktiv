import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { callUpdateUsername } from '../../apiCalls/usersCalls';
import { mockRenderFeedbackModal } from '../../context/ModalContext';
import { mockSetUser } from '../../context/AuthContext';
import ChangeUsername from './ChangeUsername';

jest.mock('../../apiCalls/usersCalls');
jest.mock('../../context/ModalContext');
jest.mock('../../context/AuthContext');

describe('ChangeUsername', () => {
    it('successfully updates username', async () => {
        render(<ChangeUsername />);
        callUpdateUsername.mockResolvedValue({
            success: true,
            message: `Username updated to: ${'new-username'}`,
            user: {
                username: 'new-username',
                created_at: 'date'
            }
        })

        fireEvent.change(screen.getByRole('textbox', { name: /change username/i }),
            { target: { value: 'mock-username' } });
        fireEvent.change(screen.getByLabelText(/enter password to confirm change/i),
            { target: { value: 'mock-password' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(callUpdateUsername).toHaveBeenCalledWith('mock-username', 'mock-password');
            expect(mockRenderFeedbackModal).toHaveBeenCalledWith('Username updated to: new-username');
            expect(mockSetUser).toHaveBeenCalledWith({
                username: 'new-username',
                created_at: 'date'
            });
        });
    })
})