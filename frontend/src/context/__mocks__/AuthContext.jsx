export const mockSignIn = jest.fn();
export const mockSignOut = jest.fn();
export const mockSetUser = jest.fn();

export const useAuth = () => ({
    user: 'mock-user',
    signIn: mockSignIn,
    signOut: mockSignOut,
    setUser: mockSetUser
})