import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { changeInput, isValidSubmission } from '../../utils/helpers';
import { callCreateUser } from '../../../apiCalls/usersCalls';
import styles from './View.module.scss';
import errorIcon from '../../../assets/error.svg';

function CreateUser({ setView, setSubmitErr }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [inputErr, setInputErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const { setUser } = useAuth();

    useEffect(() => {
        const checkPassword = () => {
            if (newPassword !== retypedPassword && retypedPassword.length > 0) {
                setPasswordErr('passwords do not match');
                return;
            }
            setPasswordErr('')
        }
        checkPassword();
    }, [retypedPassword])

    const handleChange = (setter, inputType) => {
        return (e) => {
            setSubmitErr('');
            changeInput(e, setter, setInputErr, inputType)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(newUsername, 'username') ||
            !isValidSubmission(newPassword, 'password')
        ) {
            setSubmitErr('invalid username or password');
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
        } catch (err) {
            setSubmitErr(err.message)
        } finally {
            setNewUsername('');
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
                    onChange={handleChange(setNewUsername, 'username')}
                    placeholder='new username'
                    required
                />

                {inputErr ?
                    <p className={styles.inputErr} aria-live='polite'>
                        <img src={errorIcon} alt='' />
                        <span>{inputErr}</span>
                    </p>
                    : <div style={{ height: '12px' }}></div>}

                <label className={styles.srOnly} htmlFor='password'>Register a new password</label>
                <input
                    id='password'
                    type='password'
                    value={newPassword}
                    onChange={handleChange(setNewPassword, 'password')}
                    placeholder='new password'
                    required
                />

                {passwordErr &&
                    <p className={styles.inputErr} aria-live='polite'>
                        <img src={errorIcon} alt='' />
                        <span>{passwordErr}</span>
                    </p>}

                <label className={styles.srOnly} htmlFor='re-enter-password'>Re-enter your new password</label>
                <input
                    id='re-enter-password'
                    type='password'
                    value={retypedPassword}
                    onChange={(e) => {
                        setRetypedPassword(e.target.value);
                        setSubmitErr('')
                    }}
                    placeholder='re-enter new password'
                    required
                />
            </div>

            <div className={styles.buttons}>
                <button type='submit' className={styles.btn1}>Register</button>
                <button type='button' className={styles.btn2} onClick={() => {
                    setView('sign-in');
                    setSubmitErr('');
                }}>Go Back To Sign In</button>
            </div>
        </form>

    );
};

export default CreateUser;
