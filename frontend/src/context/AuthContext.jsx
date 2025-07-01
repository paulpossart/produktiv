import { createContext, useContext, useState, useEffect } from 'react';
import { callSignIn, callSignOut } from '../apiCalls/authCalls';
import { callGetUser } from '../apiCalls/usersCalls';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(user)
    }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await callGetUser();
                if (data?.userData) setUser(data.user);
                else setUser(null)
            } catch (err) {
                setUser(null)
            } finally {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, []);

    const signIn = async (username, password) => {
        try {
            const data = await callSignIn(username, password);
            if (data?.user) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setUser(null);
            throw err;
        }
    };

    const signOut = async () => {
        try {
            await callSignOut();
            setUser(null);
        } catch (err) {
            //throw 
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
