import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
	const [mainModalContent, setMainModalContent] = useState(null);
	const [innerModalContent, setInnerModalContent] = useState(null);
	const [feedbackModalContent, setFeedbackModalContent] = useState(null);
	const [onFeedbackClose, setOnFeedbackClose] = useState(() => () => { });
	const [onAllClose, setOnAllClose] = useState(() => () => { });

	const renderMainModal = (content) => {
		setMainModalContent(content);
		setOnAllClose(() => () => { });
	}
	const hideMainModal = () => {
		setMainModalContent(null)
		setInnerModalContent(null);
		setFeedbackModalContent(null);
		onAllClose();
	}

	const renderInnerModal = (content) => {
		setInnerModalContent(content);
		setOnAllClose(() => () => { });
	}
	const hideInnerModal = () => {
		setInnerModalContent(null)
		setFeedbackModalContent(null);
		onAllClose();
	}

	const renderFeedbackModal = (content) => {
		setFeedbackModalContent(content);
		setOnFeedbackClose(() => () => { });
		setOnAllClose(() => () => { });
	}

	const hideFeedbackModal = () => {
		setFeedbackModalContent(null);
		onFeedbackClose();
		onAllClose();
	}

	return (
		<ModalContext.Provider value={{
			mainModalContent, innerModalContent, feedbackModalContent,
			renderMainModal, hideMainModal,
			renderInnerModal, hideInnerModal,
			renderFeedbackModal, hideFeedbackModal,
			setOnFeedbackClose, setOnAllClose
		}}>
			{children}
		</ModalContext.Provider>
	);
};

export { useModal, ModalProvider };
