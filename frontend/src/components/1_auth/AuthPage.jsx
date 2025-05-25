import SignIn from './SignIn';
import RegUser from './RegUser';
import styles from './auth.module.scss';

import Modal from '../6_utils/modal/Modal';
import { useModal } from '../../context/ModalContext';

import { useState } from 'react';


function AuthPage() {
    const [view, setView] = useState('sign-in');
    const { modalContent } = useModal();

    return (
        <div className={styles.backgroundImg}>
            {modalContent && <Modal>{modalContent}</Modal>}
            <div className={styles.authForm}>
                <div className={styles.viewContainer}>
                    {view === 'sign-in'
                        ? <SignIn setView={setView} />
                        : <RegUser setView={setView} />
                    }
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
