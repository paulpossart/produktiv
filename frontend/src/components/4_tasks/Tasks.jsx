import CreateTasks from './CreateTasks';
import GetTasks from './GetTasks';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { setModal } from '../6_utils/helpers/helperFunctions';
import { useModal } from '../../context/ModalContext';
import { callGetTasks } from '../../apiCalls/tasksCalls';
import styles from './tasks.module.scss';
import plus from '../../assets/plus-sign.svg';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const { user } = useAuth();
    const username = user ? user.username : 'guest';
    const { setModalContent } = useModal();

    const fetchTasks = async () => {
        try {
            const data = await callGetTasks();
            setTasks(data);
        } catch (err) {
            setTasks([]);
            setFetchError(err.message);
        }
    }

    const addTask = () => {
        setModal({
            setModalContent: setModalContent,
            btn: false,
            content: <CreateTasks
                fetchTasks={fetchTasks}
                prevTask={
                    tasks.length !== 0
                        ? tasks[0]
                        : null
                } />
        });
    }

    return (
        <div className={styles.homeDiv}>
            <div className={styles.welcome}>
                <p>Welcome {username}!</p>
                <button className={styles.btn2} onClick={addTask}>Add Task <img src={plus} /></button>
            </div>

            <div className={styles.tasksContainer}>
                {fetchError
                    ? fetchError
                    : <GetTasks
                        fetchTasks={fetchTasks}
                        tasks={tasks}
                    />}
            </div>
        </div>
    );
};

export default Tasks;
