import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { changeInput, isValidSubmission } from '../../utils/helpers';
import styles from './View.module.scss';
import errorIcon from '../../../assets/error.svg';

function SignIn({ setView, setSubmitErr }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputErr, setInputErr] = useState('');
    const { signIn } = useAuth();

    const handleChange = (setter, inputType) => {
        return (e) => {
            setSubmitErr('');
            changeInput(e, setter, setInputErr, inputType)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(username, 'username') ||
            !isValidSubmission(password, 'password')
        ) {
            setSubmitErr('invalid username or password');
            return;
        }

        try {
            await signIn(username, password);
            setSubmitErr('');
        } catch (err) {
            setSubmitErr(err.message)
        } finally {
            setUsername('');
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
                    onChange={handleChange(setUsername, 'username')}
                    placeholder='username'
                    required
                />

                {inputErr ?
                    <p className={styles.inputErr} aria-live='polite'>
                        <img src={errorIcon} alt='' />
                        <span>{inputErr}</span>
                    </p>
                    : <div style={{ height: '12px' }}></div>}

                <label className={styles.srOnly} htmlFor='password'>Enter password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={handleChange(setPassword, 'password')}
                    placeholder='password'
                    required
                />

                <input disabled style={{ visibility: 'hidden' }} />
            </div>

            <div className={styles.buttons}>
                <button type='submit' className={styles.btn1}>Sign In</button>
                <button type='button' className={styles.btn2} onClick={() => {
                    setView('reg');
                    setSubmitErr('');
                }}>
                    Go To User Registration</button>
            </div>

        </form >

    );
};

export default SignIn;
