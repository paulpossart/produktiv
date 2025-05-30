import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserMsg } from '../../context/UserMsgContext';
import styles from './auth.module.scss';

function NewCreds() {
    const { setUser } = useAuth();
    const {userMsg} = useUserMsg();

    useEffect(() => {
        setUser(null);
    }, [setUser])

    return (
        <div className={styles.backgroundImg}>
            <div className={styles.userMsg}>
                <p>{userMsg}</p>
                <Link className={styles.btn1} to='/auth'>OK</Link>
            </div>
        </div>
    );
};

export default NewCreds;
