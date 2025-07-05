import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
	const [mainModalContent, setMainModalContent] = useState(null);
	const [innerModalContent, setInnerModalContent] = useState(null);
	const [feedbackModalContent, setFeedbackModalContent] = useState(null);

	const renderMainModal = (content) => {
		setMainModalContent(content);
	}
	const hideMainModal = () => {
		setMainModalContent(null)
	}

	const renderInnerModal = (content) => {
		setInnerModalContent(content);
	}
	const hideInnerModal = () => {
		setInnerModalContent(null)
	}

	const renderFeedbackModal = (content) => {
		setFeedbackModalContent(content);
	}
	const hideFeedbackModal = () => {
		setFeedbackModalContent(null)
	}

	return (
		<ModalContext.Provider value={{
			mainModalContent, innerModalContent, feedbackModalContent,
			renderMainModal, hideMainModal,
			renderInnerModal, hideInnerModal,
			renderFeedbackModal, hideFeedbackModal
		}}>
			{children}
		</ModalContext.Provider>
	);
};

export { useModal, ModalProvider };
