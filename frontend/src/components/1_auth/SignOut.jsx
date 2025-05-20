import { useNavigate } from 'react-router-dom';
import { callSignOut } from '../../apiCalls/authCalls';
import { useAuth } from '../../context/AuthContext';

function SignOut() {
    const navigate = useNavigate();
    const {user, setUser} = useAuth();

    const handleSignOut = async () => {
        await callSignOut();
        setUser(null);
        navigate('/auth');
    };

    return (
        <button type='button' onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOut;
