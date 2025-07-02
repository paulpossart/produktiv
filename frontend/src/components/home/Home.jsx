import { useAuth } from "../../context/AuthContext";
import Header from "../header/Header";
import AddTask from "../addTask/AddTask";
import TaskList from "../taskList/TaskList";
import styles from './Home.module.scss';

function Home() {
    return (
        <div className={styles.Home}>
            <Header className={styles.Header} />

            <AddTask className={styles.AddTask} />
            <TaskList className={styles.TaskList} />

        </div>
    );
}

export default Home;
