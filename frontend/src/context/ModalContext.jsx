import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
	const [mainModalContent, setMainModalContent] = useState(null);
	const [innerModalContent, setInnerModalContent] = useState(null);
	const [feedbackModalContent, setFeedbackModalContent] = useState(null);
	const [onClose, setOnClose] = useState(() => () => { });

	const renderMainModal = (content) => {
		setMainModalContent(content);
		setOnClose(() => () => { });
	}
	const hideMainModal = () => {
		setMainModalContent(null)
		setInnerModalContent(null);
		setFeedbackModalContent(null);
		onClose();
	}

	const renderInnerModal = (content) => {
		setInnerModalContent(content);
		setOnClose(() => () => { });
	}
	const hideInnerModal = () => {
		setInnerModalContent(null)
		setFeedbackModalContent(null);
		onClose();
	}

	const renderFeedbackModal = (content) => {
		setFeedbackModalContent(content);
		setOnClose(() => () => { });
	}

	const hideFeedbackModal = () => {
		setFeedbackModalContent(null);
		onClose();
	}

	return (
		<ModalContext.Provider value={{
			mainModalContent, innerModalContent, feedbackModalContent,
			renderMainModal, hideMainModal,
			renderInnerModal, hideInnerModal,
			renderFeedbackModal, hideFeedbackModal,
			setOnClose
		}}>
			{children}
		</ModalContext.Provider>
	);
};

export { useModal, ModalProvider };
