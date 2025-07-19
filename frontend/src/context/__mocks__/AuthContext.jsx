export const mockSignIn = jest.fn();
export const mockSignOut = jest.fn();

export const useAuth = () => ({
    signIn: mockSignIn,
    signOut: mockSignOut,
    setUser: jest.fn()
})