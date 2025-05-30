import styles from './auth.module.scss';

import Duk from '../6_utils/duk/Duk';
import dukStyles from '../6_utils/duk/duk.module.scss';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { setModal } from '../6_utils/helperFunctions';
import { callSignIn } from '../../apiCalls/authCalls';

function SignIn({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const { setModalContent } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await callSignIn(username, password);
            if (data?.userData) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setModal({setModalContent: setModalContent, content: err.message});
            setUser(null);
        } finally {
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div>
                <Duk className={dukStyles.auth} />
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
