export const mockSetTheme = jest.fn();

export const useTheme = () => ({
    theme: jest.fn(),
    setTheme: mockSetTheme
});
