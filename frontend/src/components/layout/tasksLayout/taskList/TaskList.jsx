import { useEffect } from 'react';
import Tasks from '../../../tasks/Tasks';
import Loader from '../../../utils/loader/Loader';
import styles from './TaskList.module.scss';

function TaskList({
    className,
    tasks,
    fetchErr,
    isLoading,
    fetchTasks
}) {

    return (
        <section aria-labelledby='task-list-title' className={`${className} ${styles.TaskList}`}>
            <h2 id='task-list-title' className={styles.srOnly}>Task list</h2>
            {
                fetchErr ? fetchErr
                    : isLoading ? <Loader />
                        : tasks.length === 0 ? 'Please add a task!'
                            : <Tasks tasks={tasks} fetchTasks={fetchTasks} />
            }
        </section>
    );
};

export default TaskList;