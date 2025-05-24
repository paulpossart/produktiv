import { useState } from 'react';
import styles from './auth.module.scss';
import duk from '../../assets/duk-yel.svg';
import { useAuth } from '../../context/AuthContext';
import { callSignIn } from '../../apiCalls/authCalls';
import Duk from '../6_ui/Duk';

function SignIn({ setView, setAuthError }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await callSignIn(username, password);
            if (data && data.userData) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setAuthError(err.message);
            setUser(null);
        } finally {
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div>
                <Duk className={styles.duk} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='username'
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />

                <button type='submit' className={styles.btn1}>Sign In</button>
            </form >
            <button onClick={() => setView('reg')} className={styles.btn2}>Go To User Registration</button>
        </div >
    );
};

export default SignIn;
