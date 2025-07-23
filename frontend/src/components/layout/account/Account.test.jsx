import { fireEvent, render, screen } from '@testing-library/react';
import { mockRenderInnerModal } from '../../../context/ModalContext';
import Account from './Account';
import ChangeUsername from '../../users/ChangeUsername';
import ChangePassword from '../../users/ChangePassword';
import DeleteUser from '../../users/DeleteUser';

jest.mock('../../../context/ModalContext');
jest.mock('../../../context/AuthContext');

describe('Account', () => {

    beforeEach(() => {
        render(<Account />);
    })

    it('renders "Change Username" modal', async () => {
        fireEvent.click(screen.getByRole('button', { name: /change username/i }));
        expect(mockRenderInnerModal).toHaveBeenCalledWith(<ChangeUsername />);
    })

    it('renders "Change Password" modal', async () => {
        fireEvent.click(screen.getByRole('button', { name: /change password/i }));
        expect(mockRenderInnerModal).toHaveBeenCalledWith(<ChangePassword />);
    })

      it('renders "Delete User" modal', async () => {
        fireEvent.click(screen.getByRole('button', { name: /delete user/i }));
        expect(mockRenderInnerModal).toHaveBeenCalledWith(<DeleteUser />);
    })
})