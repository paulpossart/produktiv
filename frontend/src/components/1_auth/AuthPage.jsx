import SignIn from './SignIn';
import RegUser from './RegUser';
import Modal from '../6_utils/modal/Modal';
import { useModal } from '../../context/ModalContext';
import { useState } from 'react';
import styles from './auth.module.scss';

function AuthPage() {
    const [view, setView] = useState('sign-in');
    const { modalContent } = useModal();

    return (
        <section className={styles.backgroundImg}>
            {modalContent && <Modal>{modalContent}</Modal>}
            <div className={styles.authForm}>
                <div className={styles.viewContainer}>
                    {view === 'sign-in'
                        ? <SignIn setView={setView} />
                        : <RegUser setView={setView} />
                    }
                </div>
            </div>
        </section>
    );
};

export default AuthPage;
