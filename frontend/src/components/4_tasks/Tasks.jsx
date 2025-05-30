import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CreateTasks from './CreateTasks';
import GetTasks from './GetTasks';
import Modal from '../6_utils/modal/Modal';
import { setModal } from '../6_utils/helperFunctions';
import { useModal } from '../../context/ModalContext';
import plus from '../../assets/plus-sign.svg';
import styles from './tasks.module.scss';
import { callGetTasks } from '../../apiCalls/tasksCalls';



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
