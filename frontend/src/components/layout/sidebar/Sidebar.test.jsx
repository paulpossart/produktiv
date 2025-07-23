import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockRenderMainModal } from '../../../context/ModalContext';
import { mockSignOut } from '../../../context/AuthContext';
import { mockSetTheme } from '../../../context/ThemeContext';
import Sidebar from './Sidebar';
import Account from '../account/Account';

jest.mock('../../../context/ModalContext');
jest.mock('../../../context/AuthContext');
jest.mock('../../../context/ThemeContext');

describe('Sidebar', () => {

    beforeEach(() => {
        render(<Sidebar />);
        jest.clearAllMocks();
    })

    it('opens and closes sidebar on menu button click', async () => {
        const menuBtn = screen.getByRole('button', { name: /open menu/i });
        const sidebar = screen.getByRole('navigation');

        fireEvent.click(menuBtn);
        expect(sidebar).toHaveClass('navOpen');

        fireEvent.click(menuBtn);
        expect(sidebar).toHaveClass('navClosed');
    })

    it('sets the theme on theme button click', () => {
        const themeBtn = screen.getByTestId('theme-btn')

        fireEvent.click(themeBtn);
        expect(mockSetTheme).toHaveBeenCalledWith(
            expect.stringContaining('light' || 'dark')
        );
    });

    it('renders the account modal on account button click', () => {
        fireEvent.click(screen.getByRole('button', { name: /account/i }));
        expect(mockRenderMainModal).toHaveBeenCalledWith(<Account />);
    });

    it('sign out user on click', () => {
        fireEvent.click(screen.getByRole('button', { name: /sign out/i }));
        expect(mockSignOut).toHaveBeenCalled();
    });
})