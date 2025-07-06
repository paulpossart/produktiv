import { useModal } from '../../../context/ModalContext';
import styles from './Modal.module.scss';

function FeedbackModal({ children }) {
    const {
        hideFeedbackModal,
    } = useModal();

    return (
        <>
            <div className={styles.overlay} onClick={hideFeedbackModal}></div>
            <div className={styles.FeedbackModal}>
                {children}
                <button onClick={hideFeedbackModal} className={styles.btn1}>OK</button>
            </div>
        </>
    );
};

export default FeedbackModal;