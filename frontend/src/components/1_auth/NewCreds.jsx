import { Link } from 'react-router-dom';
import styles from './auth.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useUserMsg } from '../../context/UserMsgContext';

function NewCreds() {
    const { setUser } = useAuth();
    const {userMsg} = useUserMsg();

    useEffect(() => {
        setUser(null);
    }, [setUser])

    return (
        <div className={styles.backgroundImg}>
            <div className={styles.notFound}>
                <p>{userMsg}</p>
                <Link className={styles.btn1} to='/auth'>OK</Link>
            </div>
        </div>
    );
};

export default NewCreds;
