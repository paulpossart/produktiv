import { useModal } from "../../context/ModalContext";
import MainModal from "./modals/MainModal";
import Header from "./header/Header";
import AddTask from "../tasks/addTask/AddTask";
import TaskList from "../tasks/taskList/TaskList";
import styles from './Home.module.scss';


function Home() {
    const { mainModalContent } = useModal();

    return (
        <div className={styles.Home}>

            {
                mainModalContent &&
                <MainModal>{mainModalContent}</MainModal>
            }

            <Header className={styles.Header} />

            <main>
                <AddTask className={styles.AddTask} />
                <TaskList className={styles.TaskList} />
            </main>
            
        </div>
    );
}

export default Home;
