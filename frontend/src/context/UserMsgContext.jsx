import { createContext, useContext, useState } from 'react';

const UserMsgContext = createContext();
const useUserMsg = () => useContext(UserMsgContext);

function UserMsgProvider({ children }) {
    const [userMsg, setUserMsg] = useState(null);

    return (
        <UserMsgContext.Provider value={{ userMsg, setUserMsg }}>
            {children}
        </UserMsgContext.Provider>
    );
};

export { useUserMsg, UserMsgProvider };
