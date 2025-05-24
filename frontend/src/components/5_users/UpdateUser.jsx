import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../6_ui/Modal';
import { callUpdateUser } from '../../apiCalls/usersCalls';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import styles from './account.module.scss';

function UpdateUser({ setIsUpdateUser }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateError, setUpdateError] = useState(null);

    const { setUser } = useAuth();

    const { setModalContent } = useModal();

    const navigate = useNavigate();

    const safeRegex = /^[^<>{};\\]*$/;
    const bannedRegEx = '< > { } ; \\';


    const modalMessage = (message) => (
        <>
            <p>{message}</p>
            <button
                className={styles.btn1}
                onClick={() => setModalContent(<UpdateUser />)}
            >
                OK
            </button>
        </>
    );

    const handleChangeUsername = (e) => {
        const bannedRegEx = '< > { } ; \\';
        const value = e.target.value;
        setNewUsername(value);

        if (value.length > 30) {
            setUpdateError('Username should be between 1 - 30 characters');
        } else if (!safeRegex.test(newUsername)) {
            setUpdateError(
                `Username cannot contain the following characters: ${bannedRegEx}`
            );
        } else setUpdateError(null)
    };

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setNewPassword(value);

        if (value.length > 30) {
            setUpdateError('Password should be between 6 - 30 characters');
        } else setUpdateError(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newUsername.trim() || newUsername.length > 30) {
            setModalContent(
                modalMessage('Username should be between 1 - 30 characters')
            )
            return;
        };

        if (!newPassword || newPassword.length < 6 || newPassword.length > 30) {
            setModalContent(
                modalMessage('Password should be between 6 - 30 characters')
            )
            return;
        };

        if (!safeRegex.test(newUsername)) {
            setModalContent(
                modalMessage(`Usernames cannot contain the following characters: ${bannedRegEx}`)
            )
            return;
        };

        try {
            const data = await callUpdateUser(newUsername.trim(), newPassword);
            if (data && data.success) {
                setModalContent(
                    <>
                        <p>{data.message}</p>
                        <button className={styles.btn1} onClick={() => {
                            setModalContent(null);
                            setUser(null);
                            navigate('/auth');
                        }}>
                            OK
                        </button>
                    </>
                )
            } else {
                setModalContent(
                    modalMessage('an error occured')
                )
            }

        } catch (err) {
            setModalContent(modalMessage(err.message))
        } finally {
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <Modal className={styles.updateUser}>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newUsername}
                    onChange={handleChangeUsername}
                    placeholder='new username'
                />

                {updateError && <p>{updateError}</p>}

                <input
                    type='password'
                    value={newPassword}
                    onChange={handleChangePassword}
                    placeholder='new password'
                />
                <div className={styles.updateBtns}>
                    <button type='button' className={styles.btn2} onClick={() => setModalContent(null)}>Cancel</button>
                    <button type='submit' className={styles.btn1}>Update</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateUser;
