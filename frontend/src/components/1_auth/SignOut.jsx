import styles from './auth.module.scss';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { callSignOut } from '../../apiCalls/authCalls';


function SignOut() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleSignOut = async () => {
        await callSignOut();
        setUser(null);
        navigate('/auth');
    };

    return (
        <button
            type='button'
            style={{ whiteSpace: 'nowrap' }}
            className={styles.btn2}
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
};

export default SignOut;
