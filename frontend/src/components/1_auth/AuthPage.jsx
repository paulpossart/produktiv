import { useState } from 'react';
import SignIn from './SignIn';
import RegUser from './RegUser';
import styles from './auth.module.scss';


function AuthPage() {
    const [view, setView] = useState('sign-in');
    const [authError, setAuthError] = useState(null);

    function ErrorModal() {
        return (
            <div style={{ color: 'white', zIndex: '100', position: 'absolute' }}>
                <p>{authError}</p>
                <button onClick={()=>setAuthError(null)}>ok</button>
            </div>
        )
    }

    return (
        <div className={styles.backgroundImg}>
            {authError && <ErrorModal  />}
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
