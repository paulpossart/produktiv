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
            <main className={styles.outlet}>
                <Outlet />
            </main>
        </div>
    );
};

export default Root;
