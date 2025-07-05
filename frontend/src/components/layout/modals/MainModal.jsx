import { useModal } from '../../../context/ModalContext';
import styles from './Modal.module.scss';


function MainModal({ children }) {
    const { hideMainModal } = useModal();

    return (
        <>
            <div className={styles.overlay} onClick={hideMainModal}></div>
            <div className={styles.MainModal}>
                {children}
            </div>
        </>
    );
};

export default MainModal;

