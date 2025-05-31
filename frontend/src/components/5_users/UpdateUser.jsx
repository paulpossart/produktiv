import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { changeInput, validSubmmission, setUpdateMiniModal } from '../6_utils/helpers/helperFunctions';
import { callUpdateUser } from '../../apiCalls/usersCalls';
import { useUserMsg } from '../../context/UserMsgContext';
import styles from './account.module.scss';

function UpdateUser({ setMiniModal }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateError, setUpdateError] = useState(null);
    const { setModalContent } = useModal();
    const { setUserMsg } = useUserMsg();
    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        changeInput(e, setNewUsername, setUpdateError, 'username')
    };

    const handleChangePassword = (e) => {
        changeInput(e, setNewPassword, setUpdateError, 'password')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validSubmmission(newUsername, newPassword);

        if (!isValid.valid) {

            setUpdateMiniModal(setMiniModal, (
                <>
                    <p> {isValid.message}</p>
                    <button className={styles.btn1} onClick={() => setUpdateMiniModal(setMiniModal, <UpdateUser setMiniModal={setMiniModal} />)}>
                        OK
                    </button>
                </>
            ))
            return;
        }

        try {
            const data = await callUpdateUser(newUsername.trim(), newPassword);
            if (data?.success) {
                setUserMsg(data.message)
                navigate('/new-credentials');
                setMiniModal(null)
                setModalContent(null)

            }
        } catch (err) {
            setUpdateMiniModal(setMiniModal, (
                <>
                    <p> {err.message}</p>
                    <button className={styles.btn1} onClick={() => setUpdateMiniModal(setMiniModal, <UpdateUser setMiniModal={setMiniModal} />)}>
                        OK
                    </button>
                </>
            ))

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

                {updateError && <p className={styles.feedback}>{updateError}</p>}

                <input
                    type='password'
                    value={newPassword}
                    onChange={handleChangePassword}
                    placeholder='new password'
                />
                <br />
                <div className={styles.updateBtns}>
                    <button type='button' className={styles.btn2} onClick={() => setMiniModal(null)}>Cancel</button>
                    <button type='submit' className={styles.btn1}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
