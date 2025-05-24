import { Outlet } from 'react-router-dom';
import Header from './components/2_header/Header';
import styles from './root.module.scss';
import Modal from './components/6_ui/Modal';
import { useModal } from './context/ModalContext';

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
