import { useModal } from '../../../context/ModalContext';
import Account from '../account/Account';
import styles from './Modal.module.scss';

const displayAccountModal = (setter) => {
    setter(<Account />);
};

function AccountModal({ children }) {
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

export { AccountModal, displayAccountModal };

