import { useModal } from "../../context/ModalContext";
import { AccountModal } from "./modals/AccountModal";
import Header from "./header/Header";
import AddTask from "../tasks/addTask/AddTask";
import TaskList from "../tasks/taskList/TaskList";
import styles from './Home.module.scss';


function Home() {
    const { accountModalContent } = useModal();

    return (
        <div className={styles.Home}>

            {
                accountModalContent &&
                <AccountModal>{accountModalContent}</AccountModal>
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
