import { useAuth } from '../../../../context/AuthContext';
import { useModal } from '../../../../context/ModalContext';
import CreateTask from '../../../tasks/createAndEditTasks/CreateTask';
import styles from './AddTask.module.scss';
import addIcon from '../../../../assets/plus-sign.svg';

function AddTask({ className, tasks, fetchTasks }) {
    const { user } = useAuth();
    const { renderMainModal } = useModal();
    const username = user.username

    return (
        <section
            aria-labelledby='add-task-title'
            className={`${className} ${styles.AddTask}`}
        >
            <h2 id='add-task-title' className={styles.srOnly}>Add task</h2>
            <p>Welcome {username}!</p>
            <button className={styles.btn2} onClick={() =>
                renderMainModal(<CreateTask
                    tasks={tasks}
                    fetchTasks={fetchTasks}
                />)}
            >
                Add Task
                <img src={addIcon} alt='' />
            </button>
        </section>
    );
};

export default AddTask;