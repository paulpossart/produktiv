import { useState } from 'react';
import SignIn from './SignIn';
import RegUser from './RegUser';
import styles from './auth.module.scss';


function AuthPage() {
    const [view, setView] = useState('sign-in');
    const [authError, setAuthError] = useState(null);

    function ErrorModal() {
        return (
            <>
                <div className={styles.modalOverlay}></div>
                <div className={styles.modal}>
                    <p>{authError}</p>
                    <button className={styles.btn1} onClick={() => setAuthError(null)}>OK</button>
                </div>
            </>
        )
    }

    return (
        <div className={styles.backgroundImg}>
            {authError && <ErrorModal />}
            <div className={styles.authForm}>
                <div className={styles.viewContainer}>
                    {view === 'sign-in'
                        ? <SignIn setView={setView} setAuthError={setAuthError} />
                        : <RegUser setView={setView} setAuthError={setAuthError} />
                    }
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
