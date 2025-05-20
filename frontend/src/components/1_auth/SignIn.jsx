import { useState } from 'react';
import styles from './auth.module.scss';
import duk from '../../assets/duk-yel.svg';
import { useAuth } from '../../context/AuthContext';
import { callSignIn } from '../../apiCalls/authCalls';


function SignIn({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await callSignIn(username, password);

        if (user) setUser(user);
        else setUser(null);

        setUsername('');
        setPassword('');
    };

    return (
        <div className={styles.formContainer}>
            <img src={duk} />
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
