import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { changeInput, isValidSubmission } from '../utils/helpers';
import { callUpdateUsername } from '../../apiCalls/usersCalls';
import styles from './users.module.scss';
import errorIcon from '../../assets/error.svg';

function ChangeUsername() {
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const { hideInnerModal, renderFeedbackModal, setOnFeedbackClose} = useModal();
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(newUsername, 'username') ||
            !isValidSubmission(password, 'password')
        ) {
            renderFeedbackModal('Invalid username or password');
            setPassword('');
            return;
        }

        try {
            const data = await callUpdateUsername(newUsername, password);
            renderFeedbackModal(data.message);
            setOnFeedbackClose(()=>hideInnerModal)
            setUser(data.user);
            setNewUsername('');
        } catch (err) {
            renderFeedbackModal(err.message);
        } finally {
            setPassword('');
        }
    };

    return (
        <form
            className={styles.ChangeUsername}
            onSubmit={handleSubmit}
            aria-labelledby='change-username-form'
        >
            <h2 id='change-username-form'>Change Username</h2>

            <label htmlFor='new-username' className={styles.srOnly}>Change username</label>
            <input
                id='new-username'
                type='text'
                value={newUsername}
                onChange={(e) => changeInput(e, setNewUsername, setUsernameErr, 'username')}
                placeholder='new username'
                required
                aria-invalid={!!usernameErr}
                aria-errormessage={usernameErr ? 'username-error' : undefined}
            />

            <div className={styles.inputErr}>
                {
                    usernameErr &&
                    <p id='username-error' >
                        <img src={errorIcon} alt='' />
                        <span>{usernameErr}</span>
                    </p>
                }
            </div>

            <label htmlFor='password' className={styles.srOnly}>Enter password to confirm change</label>
            <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => changeInput(e, setPassword, setPasswordErr, 'password')}
                placeholder='enter password to confirm'
                required
                aria-invalid={!!passwordErr}
                aria-errormessage={passwordErr ? 'password-error' : undefined}
            />

            <div className={styles.inputErr}>
                {
                    passwordErr &&
                    <p id='password-error'>
                        <img src={errorIcon} alt='' />
                        <span>{passwordErr}</span>
                    </p>
                }
            </div>

            <div className={styles.buttons}>
                <button className={styles.btn2} type='button' onClick={hideInnerModal}>Cancel</button>
                <button className={styles.btn1} type='submit'>Save</button>
            </div>

        </form>
    );
};

export default ChangeUsername;