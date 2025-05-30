import styles from './auth.module.scss';

import Duk from '../6_utils/duk/Duk';
import dukStyles from '../6_utils/duk/duk.module.scss';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { changeInput, validSubmmission, setModal } from '../6_utils/helperFunctions';
import { callCreateUser } from '../../apiCalls/usersCalls';

function RegUser({ setView }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [regError, setRegError] = useState(null);
    const { setUser } = useAuth();
    const { setModalContent } = useModal();

    const handleChangeUsername = (e) => {
        changeInput(e, setNewUsername, setRegError, 'username')
    }

    const handleChangePassword = (e) => {
        changeInput(e, setNewPassword, setRegError, 'password')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validSubmmission(newUsername, newPassword, setModalContent);
        if (!isValid) return;

        try {
            const data = await callCreateUser(newUsername.trim(), newPassword);
            if (data?.userData) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setModal({ setModalContent: setModalContent, content: err.message })
            setUser(null);
        } finally {
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div>
                <Duk className={dukStyles.auth} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit} >
                <input
                    type='text'
                    value={newUsername}
                    onChange={handleChangeUsername}
                    placeholder='new username'
                />

                {regError && <p>{regError}</p>}

                <input
                    type='password'
                    value={newPassword}
                    onChange={handleChangePassword}
                    placeholder='new password'
                />
                <button type='submit' className={styles.btn1}>Register</button>
            </form >
            <button onClick={() => setView('sign-in')} className={styles.btn2}>Go Back To Sign In</button>
        </div>
    );
};

export default RegUser; 
