
import { useTasks } from '../../context/TasksContext';
import styles from './tasks.module.scss';

function GetTasks() {
    const { tasks } = useTasks();

    return (
        <ul>
            {
                tasks.map((task, index) =>
                    <li key={task.id}>
                        {task.title}
                        {task.description}
                    </li>
                )
            }
        </ul>
    );
}

export default GetTasks;