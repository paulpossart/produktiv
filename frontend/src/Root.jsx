import Header from './components/2_header/Header';
import Modal from './components/6_utils/modal/Modal';
import { useModal } from './context/ModalContext';
import { Outlet } from 'react-router-dom';
import styles from './root.module.scss';

function Root() {
    const { modalContent } = useModal();
    return (
        <div className={styles.root}>
            {modalContent && <Modal>{modalContent}</Modal>}
            <Header className={styles.header} />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
