import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('../../../context/ThemeContext', () => ({
    useTheme: () => ({
        theme: jest.fn()
    }),
}));

jest.mock('../../../context/AuthContext', () => ({
    useAuth: () => ({
        signOut: jest.fn()
    }),
}));

jest.mock('../../../context/ModalContext', () => ({
    useModal: () => ({
        setAccountModalContent: jest.fn()
    })
}));

describe('Header', () => {
    it('checks that duk button calls handleClick and scrolls to top', () => {
        const playMock = jest.fn();
        global.Audio = jest.fn(() => ({ play: playMock }));
        global.scrollTo = jest.fn();

        render(<Header className={'className'} />);
        fireEvent.click(screen.getByLabelText(/duck image/i));
        
        expect(playMock).toHaveBeenCalled();
        expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});