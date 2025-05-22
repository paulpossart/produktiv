import { useAuth } from '../../context/AuthContext';

function Tasks() {
    const { user } = useAuth();
    const username = user ? user.username : 'guest';

    return (
        <div style={{zIndex: '3', border: 'grey solid 3px', height: '100%', padding: '1rem'}}>
            <p>Tasks for {username || 'guest'}</p>
        </div>
    );
};

export default Tasks;
