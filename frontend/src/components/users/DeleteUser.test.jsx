import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { callDeleteUser } from '../../apiCalls/usersCalls';
import { mockRenderFeedbackModal, mockSetOnClose } from '../../context/ModalContext';
import DeleteUser from './DeleteUser';

jest.mock('../../apiCalls/usersCalls');
jest.mock('../../context/ModalContext');
jest.mock('../../context/AuthContext');

describe('DeleteUser', () => {
    it('successfully deletes user', async () => {
        render(
            <MemoryRouter>
                <DeleteUser />
            </MemoryRouter>
        );
        callDeleteUser.mockResolvedValue({
            success: true,
            message: 'user successfully deleted'
        });

        const deleteBtn = screen.getByRole('button', { name: /delete/i })
        expect(deleteBtn).toBeInTheDocument();
        fireEvent.click(deleteBtn);

        const confirmDel = await screen.findByRole('button', { name: /yes, delete/i })
        expect(confirmDel).toBeInTheDocument();

        fireEvent.click(confirmDel);
        await waitFor(() => {
            expect(mockRenderFeedbackModal).toHaveBeenCalledWith('user successfully deleted');
            expect(mockSetOnClose).toHaveBeenCalledWith(expect.any(Function));
        })
    })
})