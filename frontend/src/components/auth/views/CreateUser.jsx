import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { changeInput, isValidSubmission } from '../../utils/helpers';
import { callCreateUser } from '../../../apiCalls/usersCalls';
import styles from './View.module.scss';
import errorIcon from '../../../assets/error.svg';

function CreateUser({ setView, setSubmitErr, handleInputChange }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passMatchErr, setPassMatchErr] = useState('');
    const { setUser } = useAuth();

    useEffect(() => {
        const checkPassword = () => {
            if (newPassword !== retypedPassword && retypedPassword.length > 0) {
                setPassMatchErr('passwords do not match');
                return;
            }
            setPassMatchErr('')
        }
        checkPassword();
    }, [retypedPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(newUsername, 'username') ||
            !isValidSubmission(newPassword, 'password')
        ) {
            setSubmitErr('invalid username or password');
            setNewPassword('');
            setRetypedPassword('');
            return;
        }

        if (newPassword !== retypedPassword) {
            setSubmitErr('passwords do not match');
            return;
        }

        try {
            const data = await callCreateUser(newUsername.trim(), newPassword, retypedPassword);
            if (data?.user) setUser(data.user);
            setSubmitErr('');
            setNewUsername('');
        } catch (err) {
            setSubmitErr(err.message)
        } finally {
            setNewPassword('');
            setRetypedPassword('');
        }
    };

    return (
        <form
            className={styles.authForm}
            onSubmit={handleSubmit}
            aria-labelledby='user-registration-form'
        >
            <h2 id='user-registration-form' className={styles.srOnly}>User Registration Form</h2>

            <div className={styles.inputs}>
                <label className={styles.srOnly} htmlFor='username'>Register a new username</label>
                <input
                    id='username'
                    type='text'
                    value={newUsername}
                    onChange={handleInputChange('username', setNewUsername, setUsernameErr)}
                    placeholder='new username'
                    required
                    aria-invalid={!!usernameErr}
                    aria-errormessage={usernameErr ? 'new-username-error' : undefined}
                />

                <div className={styles.inputErr}>
                    {usernameErr &&
                        <p id='new-username-error'>
                            <img src={errorIcon} alt='' />
                            <span>{usernameErr}</span>
                        </p>}
                </div>


                <label className={styles.srOnly} htmlFor='password'>Register a new password</label>
                <input
                    id='password'
                    type='password'
                    value={newPassword}
                    onChange={handleInputChange('password', setNewPassword, setPasswordErr)}
                    placeholder='new password'
                    required
                    aria-invalid={!!passwordErr}
                    aria-errormessage={passwordErr ? 'new-password-error' : undefined}
                />

                {
                    passwordErr &&
                    <p className={styles.inputErr} id='new-password-error'>
                        <img src={errorIcon} alt='' />
                        <span>{passwordErr}</span>
                    </p>
                }

                <label className={styles.srOnly} htmlFor='confirm-password'>Confirm your new password</label>
                <input
                    id='confirm-password'
                    type='password'
                    value={retypedPassword}
                    onChange={(e) => {
                        setRetypedPassword(e.target.value);
                        setSubmitErr('')
                    }}
                    placeholder='confirm new password'
                    required
                    aria-invalid={!!passMatchErr}
                    aria-errormessage={passMatchErr ? 'confirm-password-error' : undefined}
                />

                {
                    passMatchErr &&
                    <p id='confirm-password-error' className={styles.inputErr}>
                        <img src={errorIcon} alt='' />
                        <span>{passMatchErr}</span>
                    </p>
                }

            </div>

            <div className={styles.buttons}>
                <button type='submit' className={styles.btn1}>Register</button>
                <button type='button' className={styles.btn2} onClick={() => {
                    setView('sign-in');
                    setSubmitErr('');
                }}>Back to Sign In</button>
            </div>

        </form >

    );
};

export default CreateUser;
