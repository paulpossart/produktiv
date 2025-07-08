import { useEffect } from 'react';
import { useModal } from '../../../context/ModalContext';
import InnerModal from './InnerModal';
import styles from './Modal.module.scss';

function MainModal({ children }) {
    const {
        innerModalContent,
        feedbackModalContent,
        hideMainModal,
        closeModalOnEsc
    } = useModal();

    useEffect(() => {
        return closeModalOnEsc();
    }, [innerModalContent, feedbackModalContent]);

    return (
        <>

            <div className={styles.overlay} onClick={hideMainModal}></div>
            <div className={styles.MainModal}>
                {
                    innerModalContent &&
                    <InnerModal>{innerModalContent}</InnerModal>
                }
                {children}
            </div>
        </>
    );
};

export default MainModal;

