import { useAuth } from '../../context/AuthContext';
import CreateTask from './CreateTasks';
import Modal from '../6_ui/Modal';
import { useModal } from '../../context/ModalContext';
import plus from '../../assets/plus-sign.svg';
import styles from './tasks.module.scss';


function Tasks() {
    const { user } = useAuth();
    const username = user ? user.username : 'guest';
    const { setModalContent } = useModal();

    const addTask = () => setModalContent(<CreateTask />)

    return (
        <div className={styles.div}>
            <p>Welcome {username}!</p>
            <button className={styles.btn2} onClick={addTask}>Add Task <img style={{width: '30px'}} src={plus} /></button>
        </div>
    );
};

export default Tasks;
