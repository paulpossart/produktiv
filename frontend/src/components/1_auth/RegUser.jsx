import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { callCreateUser } from '../../apiCalls/usersCalls';
import styles from './auth.module.scss'
import duk from '../../assets/duk-yel.svg';

function RegUser({ setView, setAuthError }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser } = useAuth();

    const safeRegex = /^[^<>{};\\]*$/;

    const handleChangeUsername = (e) => {
        const bannedRegEx = '< > { } ; \\';
        const value = e.target.value;
        setNewUsername(value);

        if (value.length > 30) {
            setError('Username should be between 1 - 30 characters');
        } else if (!safeRegex.test(newUsername)) {
            setError(
                `Username cannot contain the following characters: ${bannedRegEx}`
            );
        } else setError(null)
    };

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setNewPassword(value);

        if (value.length > 30) {
            setError('Password should be between 6 - 30 characters');
        } else setError(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newUsername.trim() || newUsername.length > 30) {
            setError('Username should be between 1 - 30 characters');
            return;
        };

        if (!newPassword || newPassword.length < 6 || newPassword.length > 30) {
            setError('Password should be between 6 - 30 characters');
            return;
        };

        if (!safeRegex.test(newUsername)) {
            setError(
                `Usernames cannot contain the following characters: ${safeRegex}`
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
            <img src={duk} />
            <form className={styles.form} onSubmit={handleSubmit} >
                <input
                    type='text'
                    value={newUsername}
                    onChange={handleChangeUsername}
                    placeholder='new username'
                />
                
                {error && <p>{error}</p>}
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
