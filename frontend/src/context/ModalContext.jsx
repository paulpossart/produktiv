import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
	const [accountModalContent, setAccountModalContent] = useState(null);
	const [inputModalContent, setInputModalContent] = useState(null);
	const [feedbackModalContent, setFeedbackModalContent] = useState(null);

	return (
		<ModalContext.Provider value={{
			accountModalContent, setAccountModalContent,
			inputModalContent, setInputModalContent,
			feedbackModalContent, setFeedbackModalContent
		}}>
			{children}
		</ModalContext.Provider>
	);
};

export { useModal, ModalProvider };
