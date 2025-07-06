import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeInput, isValidSubmission } from '../utils/helpers';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { callUpdatePassword } from '../../apiCalls/usersCalls';
import styles from './users.module.scss';
import errorIcon from '../../assets/error.svg';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currentPassErr, setCurrentPassErr] = useState('');
    const [newPassErr, setNewPassErr] = useState('');
    const [confirmPassErr, setConfirmPassErr] = useState('');

    const { hideInnerModal, hideMainModal, renderFeedbackModal, setOnAllClose } = useModal();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkPassword = () => {
            if (newPassword !== confirmPassword && confirmPassword.length > 0) {
                setConfirmPassErr('Passwords do not match');
                return;
            }
            setConfirmPassErr('')
        }
        checkPassword();
    }, [confirmPassword]);

    const removeUser = () => {
        hideMainModal();
        setUser(null);
        navigate('/auth');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(currentPassword, 'password') ||
            !isValidSubmission(newPassword, 'password') ||
            !isValidSubmission(confirmPassword, 'password')
        ) {

            renderFeedbackModal('Invalid inputs');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            return;
        }

        try {
            const data = await callUpdatePassword(currentPassword, newPassword, confirmPassword);
            renderFeedbackModal(data.message);
            setOnAllClose(() => removeUser)
        } catch (err) {
            renderFeedbackModal(err.message);
        } finally {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <form
            className={styles.ChangePassword}
            onSubmit={handleSubmit}
            aria-labelledby='change-password-form'
        >
            <h2 id='change-password-form'>Change Password</h2>

            <label htmlFor='current-password' className={styles.srOnly}>Enter current password</label>
            <input
                id='current-password'
                type='password'
                value={currentPassword}
                onChange={(e) => changeInput(e, setCurrentPassword, setCurrentPassErr, 'password')}
                placeholder='current password'
                required
                aria-invalid={!!currentPassErr}
                aria-errormessage={currentPassErr ? 'current-password-error' : undefined}
            />

            <div className={styles.inputErr}>
                {
                    currentPassErr &&
                    <p id='current-password-error' >
                        <img src={errorIcon} alt='' />
                        <span>{currentPassErr}</span>
                    </p>
                }
            </div>

            <label htmlFor='new-password' className={styles.srOnly}>Enter new password</label>
            <input
                id='new-password'
                type='password'
                value={newPassword}
                onChange={(e) => changeInput(e, setNewPassword, setNewPassErr, 'password')}
                placeholder='new password'
                required
                aria-invalid={!!newPassErr}
                aria-errormessage={newPassErr ? 'new-password-error' : undefined}
            />

            {
                newPassErr &&
                <p id='new-password-error' className={styles.inputErr}>
                    <img src={errorIcon} alt='' />
                    <span>{newPassErr}</span>
                </p>
            }

            <label htmlFor='confirm-new-password' className={styles.srOnly}>Confirm new password</label>
            <input
                id='confirm-new-password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='confirm new password'
                required
                aria-invalid={!!confirmPassErr}
                aria-errormessage={confirmPassErr ? 'confirm-new-password-error' : undefined}
            />

            <div className={styles.inputErr}>
                {
                    confirmPassErr &&
                    <p id='confirm-new-password-error' >
                        <img src={errorIcon} alt='' />
                        <span>{confirmPassErr}</span>
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

export default ChangePassword;