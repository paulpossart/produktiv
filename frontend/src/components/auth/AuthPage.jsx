import { useState } from 'react';
import { changeInput } from '../utils/helpers';
import SignIn from './views/SignIn';
import CreateUser from './views/CreateUser';
import Disclaimer from './disclaimer/Disclaimer';
import Duk from './logoAndErrMsg/Duk';
import styles from './AuthPage.module.scss';

function AuthPage() {
    const [view, setView] = useState('sign-in');
    const [submitErr, setSubmitErr] = useState('');
    const [viewedDisclaimer, setViewedDisclaimer] = useState(() => {
        return sessionStorage.getItem('disclaimer') === 'seen';
    });

    const handleInputChange = (inputType, setter, errSetter) => {
        return (e) => {
            setSubmitErr('');
            changeInput(e, setter, errSetter, inputType)
        }
    }

    return (
        <main className={styles.AuthPage}>

            {
                !viewedDisclaimer &&
                <Disclaimer
                    onClick={() => {
                        setViewedDisclaimer(true);
                        sessionStorage.setItem('disclaimer', 'seen')
                    }}
                />
            }

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
