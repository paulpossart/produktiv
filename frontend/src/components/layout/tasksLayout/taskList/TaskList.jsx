import { useTasks } from '../../../../context/TasksContext';
import GetTasks from '../../../tasks/GetTasks';
import styles from './TaskList.module.scss';

function TaskList({ className }) {
    const { tasks, fetchErr } = useTasks();

    return (
        <section aria-labelledby='task-list-title' className={`${className} ${styles.TaskList}`}>
            <h2 id='task-list-title' className={styles.srOnly}>Task list</h2>
            {
                fetchErr ? fetchErr
                    : tasks.length === 0 ? 'Please add a task!'
                        : <GetTasks />
            }
        </section>
    );
};

export default TaskList;