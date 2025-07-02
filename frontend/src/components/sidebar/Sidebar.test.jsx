import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

const mockSetTheme = jest.fn();

jest.mock('../../context/ThemeContext', () => ({
    useTheme: () => ({
        theme: jest.fn(),
        setTheme: mockSetTheme
    }),
}));

const mockSignOut = jest.fn()

jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({
        signOut: mockSignOut
    }),
}));

describe('Sidebar', () => {
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

    //Account button test

    test('sign out button sign user out', ()=> {
        render(<Sidebar />);
        const signOutBtn = screen.getByTestId('sign-out-btn');

        fireEvent.click(signOutBtn);
        expect(mockSignOut).toHaveBeenCalled();
    });
});