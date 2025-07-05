import { fireEvent, render, screen } from '@testing-library/react';
import { displayAccountModal } from '../modals/AccountModal';
import { mockSignOut } from '../../../context/AuthContext';
import { mockSetTheme } from '../../../context/ThemeContext';
import Sidebar from './Sidebar';

jest.mock('../../../context/AuthContext');
jest.mock('../../../context/ThemeContext');
jest.mock('../../../context/ModalContext', () => ({
    useModal: () => ({
        setAccountModalContent: jest.fn()
    })
}));
jest.mock('../modals/AccountModal', () => ({
    displayAccountModal: jest.fn()
}));


describe('Sidebar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

     test('that menu button opens and closes sidebar', () => {
         render(<Sidebar />);
         const menuBtn = screen.getByLabelText(/open menu/i);
 
         fireEvent.click(menuBtn);
         expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
 
         fireEvent.click(menuBtn);
         expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
 
     });
 
     test('that the theme button sets theme', () => {
         render(<Sidebar />);
         const themeBtn = screen.getByTestId('theme-btn');
 
         fireEvent.click(themeBtn);
         expect(mockSetTheme).toHaveBeenCalledWith(
             expect.stringContaining('light' || 'dark')
         );
     });
 
     test('account button calls account modal', () => {
         render(<Sidebar />);
         const accountBtn = screen.getByTestId('account-btn');
 
         fireEvent.click(accountBtn);
         expect(displayAccountModal).toHaveBeenCalled();
     });

    test('sign out button sign user out', () => {
        render(<Sidebar />);
        const signOutBtn = screen.getByTestId('sign-out-btn');
        fireEvent.click(signOutBtn);
        expect(mockSignOut).toHaveBeenCalled();
    });
});

