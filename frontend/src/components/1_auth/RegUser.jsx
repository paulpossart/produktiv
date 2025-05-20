import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { callCreateUser } from '../../apiCalls/usersCalls';
import styles from './auth.module.scss'
import duk from '../../assets/duk-yel.svg';

function RegUser({ setView }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useAuth();

    const safeRegex = /^[^<>{};\\]*$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newUsername.trim() || newUsername.length > 30) {
            setError('Usernames should be between 1 - 30 characters');
            return;
        };

        if (!newPassword || newPassword.length < 6 || newPassword.length > 30) {
            setError('Passwords should be between 1 - 30 characters');
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
            if (data && data.success) {
                setUser(data.user);
                setNewUsername('');
                setNewPassword('');
                console.log(data.user)
            } else {
                setUser(null);
                setNewUsername('');
                setNewPassword('');
            }
        } catch (err) {
            console.log(err);
            setNewUsername('');
            setNewPassword('');
            setError('An error occurred');
        }
    };

    return (
        <div className={styles.formContainer}>
            <img src={duk} />
            {error && <p style={{ color: 'white' }}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit} >
                <input
                    type='text'
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder='new username'
                />
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='new password'
                />
                <button type='submit' className={styles.btn1}>Register</button>
            </form >
            <button onClick={() => setView('sign-in')} className={styles.btn2}>Go Back To Sign In</button>
        </div>
    );
};

export default RegUser;
