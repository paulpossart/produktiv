import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { callCreateUser } from '../../apiCalls/usersCalls';
import styles from './auth.module.scss'
import Duk from '../6_ui/Duk';

function RegUser({ setView, setAuthError }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [regError, setRegError] = useState(null);
    const { setUser } = useAuth();

    const safeRegex = /^[^<>{};\\]*$/;
    const bannedRegEx = '< > { } ; \\';

    const handleChangeUsername = (e) => {

        const value = e.target.value;
        setNewUsername(value);

        if (value.length > 30) {
            setRegError('Username should be between 1 - 30 characters');
        } else if (!safeRegex.test(newUsername)) {
            setRegError(
                `Username cannot contain the following characters: ${bannedRegEx}`
            );
        } else setRegError(null)
    };

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setNewPassword(value);

        if (value.length > 30) {
            setRegError('Password should be between 6 - 30 characters');
        } else setRegError(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError(null);

        if (!newUsername.trim() || newUsername.length > 30) {
            setAuthError('Username should be between 1 - 30 characters');
            return;
        };

        if (!newPassword || newPassword.length < 6 || newPassword.length > 30) {
            setAuthError('Password should be between 6 - 30 characters');
            return;
        };

        if (!safeRegex.test(newUsername)) {
            setAuthError(
                `Usernames cannot contain the following characters: ${bannedRegEx}`
            );
            return;
        };

        try {
            const data = await callCreateUser(newUsername.trim(), newPassword);
            if (data && data.userData) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setAuthError(err.message);
            setUser(null);
        } finally {
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div>
                <Duk className={styles.duk} />
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
