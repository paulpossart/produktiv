import { useModal } from '../../../context/ModalContext';
import styles from './Modal.module.scss';

function FeedbackModal({ children }) {
    const { hideFeedbackModal } = useModal();

    return (
        <section role='alert' aria-labelledby='feedback-title' className={styles.FeedbackModal}>
            <h2 id='feedback-title' className={styles.srOnly}>Feedback</h2>
            {children}
            <button onClick={hideFeedbackModal} className={styles.btn1}>OK</button>
        </section>
    );
};

export default FeedbackModal;