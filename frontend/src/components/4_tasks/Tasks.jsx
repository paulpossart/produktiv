import { useAuth } from '../../context/AuthContext';
import SignOut from '../1_auth/SignOut';

function Tasks() {
    const { user } = useAuth();
    const username = user ? user.username : 'guest';

    return (
        <>
            <p>Tasks for {username || 'guest'}</p>
            <SignOut />
        </>
    );
};

export default Tasks;
