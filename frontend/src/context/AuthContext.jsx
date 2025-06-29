import { createContext, useContext, useState, useEffect } from 'react';
import { callSignIn, callSignOut } from '../apiCalls/authCalls';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(user)
    }, [user]);

    const signIn = async (username, password) => {
        try {
            const data = await callSignIn(username, password);
            if (data?.user) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setUser(null);
            throw err;
        } // finally set loader?
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
        <AuthContext.Provider value={{ signIn, signOut, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
