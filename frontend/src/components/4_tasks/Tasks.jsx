import { useAuth } from '../../context/AuthContext';
import SignOut from '../1_auth/SignOut';

function Tasks() {
    const { user } = useAuth();
    const username = user ? user.username : 'guest';

    return (
        <div style={{border: 'grey solid 3px', height: '100%', padding: '1rem'}}>
            <p>Tasks for {username || 'guest'}</p>
            <SignOut />
        </div>
    );
};

export default Tasks;
