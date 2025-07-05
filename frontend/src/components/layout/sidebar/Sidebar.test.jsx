import { fireEvent, render, screen } from '@testing-library/react';
import { mockRenderMainModal } from '../../../context/ModalContext';
import { mockSignOut } from '../../../context/AuthContext';
import { mockSetTheme } from '../../../context/ThemeContext';
import Sidebar from './Sidebar';

jest.mock('../../../context/AuthContext');
jest.mock('../../../context/ThemeContext');
jest.mock('../../../context/ModalContext');

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
 
         fireEvent.click(screen.getByTestId('theme-btn'));
         expect(mockSetTheme).toHaveBeenCalledWith(
             expect.stringContaining('light' || 'dark')
         );
     });
 
     test('account button calls account modal', () => {
         render(<Sidebar />);
         
         fireEvent.click(screen.getByTestId('account-btn'));
         expect(mockRenderMainModal).toHaveBeenCalled();
     });

    test('sign out button sign user out', () => {
        render(<Sidebar />);
        
        fireEvent.click(screen.getByTestId('sign-out-btn'));
        expect(mockSignOut).toHaveBeenCalled();
    });
});

