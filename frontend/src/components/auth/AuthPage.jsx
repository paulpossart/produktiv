import { useState } from 'react';
import { changeInput } from '../utils/helpers';
import SignIn from './views/SignIn';
import CreateUser from './views/CreateUser';
import Duk from './logoAndErrMsg/Duk';
import styles from './AuthPage.module.scss';

function AuthPage() {
    const [view, setView] = useState('sign-in');
    const [submitErr, setSubmitErr] = useState('');

    const handleInputChange = (inputType, setter, errSetter) => {
        return (e) => {
            setSubmitErr('');
            changeInput(e, setter, errSetter, inputType)
        }
    }

    return (
        <main className={styles.AuthPage}>
            <section aria-labelledby='auth-title'>

                <header>
                    <h1 id='auth-title' className={styles.srOnly}>Produktiv Authorisation Page</h1>

                    <Duk errMsg={submitErr} />
                </header>

                <div aria-live='polite' className={styles.srOnly}>
                    {
                        view === 'sign-in'
                            ? 'You are on the sign in page'
                            : 'You are on the user registration page'
                    }
                </div>

                <div className={styles.view}>
                    {
                        view === 'sign-in'
                            ? <SignIn
                                setView={setView}
                                setSubmitErr={setSubmitErr}
                                handleInputChange={handleInputChange}
                            />
                            : <CreateUser
                                setView={setView}
                                setSubmitErr={setSubmitErr}
                                handleInputChange={handleInputChange}
                            />
                    }
                </div>

            </section>
        </main>
    );

};

export default AuthPage;
