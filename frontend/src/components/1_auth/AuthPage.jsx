import { useState } from 'react';
import SignIn from './SignIn';
import RegUser from './RegUser';
import styles from './auth.module.scss';


function AuthPage() {
    const [view, setView] = useState('sign-in');

    console.log(view)

    return (
        <div className={styles.backgroundImg}>
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
