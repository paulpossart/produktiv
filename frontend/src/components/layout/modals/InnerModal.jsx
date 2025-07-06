import { useModal } from '../../../context/ModalContext';
import FeedbackModal from './FeedbackModal';
import styles from './Modal.module.scss';

function InnerModal({ children }) {
    const {
        feedbackModalContent,
        hideInnerModal,
    } = useModal();

    return (
        <>
            <div className={styles.overlay} onClick={ hideInnerModal}></div>
            <div className={styles.InnerModal}>
                {
                    feedbackModalContent &&
                    <FeedbackModal>{feedbackModalContent}</FeedbackModal>
                }
                {children}
            </div>
        </>
    );
};

export default InnerModal;