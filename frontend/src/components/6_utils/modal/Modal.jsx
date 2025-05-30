import styles from './modal.module.scss';
import { useModal } from '../../../context/ModalContext';

function Modal({ children }) {
    const { setModalContent } = useModal();
    if (!children) return null;

    return (
        <>
            <div onClick={() => setModalContent(null)} className={styles.modalOverlay}></div>
            <>
                {children}
            </>
        </>
    )
}

export default Modal;
