import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { isValidSubmission } from '../../utils/helpers';
import styles from './View.module.scss';
import errorIcon from '../../../assets/error.svg';

function SignIn({ setView, setSubmitErr, handleInputChange }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(username, 'username') ||
            !isValidSubmission(password, 'password')
        ) {
            setSubmitErr('invalid username or password');
            setPassword('');
            return;
        }

        try {
            await signIn(username, password);
            setSubmitErr('');
            setUsername('');
        } catch (err) {
            setSubmitErr(err.message)
        } finally {
            setPassword('');
        }
    };

    return (
        <form
            className={styles.authForm}
            onSubmit={handleSubmit}
            aria-labelledby='sign-in-form'
        >
            <h2 id='sign-in-form' className={styles.srOnly}>Sign In Form</h2>

            <div className={styles.inputs}>
                <label className={styles.srOnly} htmlFor='username'>Enter username</label>
                <input
                    id='username'
                    type='text'
                    value={username}
                    onChange={handleInputChange('username', setUsername, setUsernameErr)}
                    placeholder='username'
                    required
                    aria-invalid={!!usernameErr}
                    aria-errormessage={usernameErr ? 'username-error' : undefined}
                />

                <div className={styles.inputErr}>
                    {usernameErr &&
                        <p id='username-error' >
                            <img src={errorIcon} alt='' />
                            <span>{usernameErr}</span>
                        </p>}
                </div>


                <label className={styles.srOnly} htmlFor='password'>Enter password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={handleInputChange('password', setPassword, setPasswordErr)}
                    placeholder='password'
                    required
                    aria-invalid={!!passwordErr}
                    aria-errormessage={passwordErr ? 'password-error' : undefined}
                />

                {
                    passwordErr &&
                    <p className={styles.inputErr} id='password-error'>
                        <img src={errorIcon} alt='' />
                        <span>{passwordErr}</span>
                    </p>
                }

                <input disabled style={{ visibility: 'hidden' }} />

            </div>

            <div className={styles.buttons}>
                <button type='submit' className={styles.btn1}>Sign In</button>
                <button type='button' className={styles.btn2} onClick={() => {
                    setView('reg');
                    setSubmitErr('');
                }}>
                    Sign Up</button>
            </div>

        </form >

    );
};

export default SignIn;
