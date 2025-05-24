import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
    const [modalContent, setModalContent] = useState(null);

    return (
        <ModalContext.Provider value={{ modalContent, setModalContent }}>
            {children}
        </ModalContext.Provider>
    );
};

export { useModal, ModalProvider };
