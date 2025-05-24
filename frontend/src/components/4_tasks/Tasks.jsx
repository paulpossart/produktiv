import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CreateTasks from './CreateTasks';
import GetTasks from './GetTasks';
import Modal from '../6_ui/Modal';
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

    const addTask = () => setModalContent(<CreateTasks fetchTasks={fetchTasks} />);

    return (
        <>
            <div className={styles.div}>
                <p>Welcome {username}!</p>
                <button className={styles.btn2} onClick={addTask}>Add Task <img style={{ width: '30px' }} src={plus} /></button>
            </div>

            <div className={styles.div} style={{ margin: '1rem 0' }}>
                {fetchError && fetchError}
                <GetTasks
                    fetchTasks={fetchTasks}
                    tasks={tasks}
                />
            </div>
        </>
    );
};

export default Tasks;
