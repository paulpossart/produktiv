import { createContext, useContext, useState, useEffect } from 'react';
import { callGetUser } from '../apiCalls/usersCalls';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await callGetUser();

                if (data.success) setUser(data.user);
                else {setUser(null);}
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider >
    );
};

export { useAuth, AuthProvider };
