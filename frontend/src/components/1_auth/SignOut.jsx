import { useNavigate } from 'react-router-dom';
import { callSignOut } from '../../apiCalls/authCalls';
import { useAuth } from '../../context/AuthContext';
import styles from './auth.module.scss';

function SignOut() {
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleSignOut = async () => {
        await callSignOut();
        setUser(null);
        navigate('/auth');
    };

    return (
        <button type='button' className={styles.btn2} onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOut;
