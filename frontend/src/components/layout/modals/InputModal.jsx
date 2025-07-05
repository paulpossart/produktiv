import { useModal } from '../../../context/ModalContext';
import styles from './Modal.module.scss';

const displayInputModal = (setter, content) => {
    setter(content);
};

function InputModal({ children }) {
    const { setAccountModalContent } = useModal();

    return (
        <>
            <div className={styles.overlay} onClick={() => setAccountModalContent(null)}></div>
            <div className={styles.AccountModal}>
                {children}
            </div>
        </>
    );
};

export { InputModal, displayInputModal };