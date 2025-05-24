import { useState } from 'react';
import SignIn from './SignIn';
import RegUser from './RegUser';
import styles from './auth.module.scss';

import ErrorModal from '../6_ui/ErrorModal';

function AuthPage() {
    const [view, setView] = useState('sign-in');
    const [authError, setAuthError] = useState(null);

    return (
        <div className={styles.backgroundImg}>
            {authError && <ErrorModal error={authError} setError={setAuthError} />}
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
