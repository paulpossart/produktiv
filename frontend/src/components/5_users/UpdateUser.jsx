import styles from './account.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { changeInput, validSubmmission, setModal } from '../6_utils/helperFunctions';
import { callUpdateUser } from '../../apiCalls/usersCalls';

function UpdateUser() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateError, setUpdateError] = useState(null);
    const { setUser } = useAuth();
    const { setModalContent } = useModal();
    const navigate = useNavigate();



    const handleChangeUsername = (e) => {
        changeInput(e, setNewUsername, setUpdateError, 'username')
    };

    const handleChangePassword = (e) => {
        changeInput(e, setNewPassword, setUpdateError, 'password')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalContent(null);
        const isValid = validSubmmission(newUsername, newPassword);

        if (!isValid.valid) {
            setModal({
                setModalContent: setModalContent,
                message: isValid.message,
                btnStyle: styles.btn1,
                content: () => setModal({
                    setModalContent: setModalContent,
                    btn: false,
                    message: <UpdateUser />
                })
            })
            return;
        }

        try {
            const data = await callUpdateUser(newUsername.trim(), newPassword);
            if (data && data.success) {
                setModal({
                    setModalContent: setModalContent,
                    btn: false,
                    message: (
                        <>
                            <p>{data.message}</p>
                            <br />
                            <button className={styles.btn1} onClick={() => {
                                setModalContent(null);
                                setUser(null);
                                navigate('/auth');
                            }}>
                                OK
                            </button>
                        </>
                    )
                })
            }
        } catch (err) {
            setModal({ setModalContent: setModalContent, message: err.message });
        } finally {
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <div className={styles.updateUser}>
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
                <br />
                <div className={styles.updateBtns}>
                    <button type='button' className={styles.btn2} onClick={() => setModalContent(null)}>Cancel</button>
                    <button type='submit' className={styles.btn1}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
