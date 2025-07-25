import { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { callGetTasks } from "../../apiCalls/tasksCalls";
import MainModal from "./modals/MainModal";
import InnerModal from "./modals/InnerModal";
import FeedbackModal from "./modals/FeedbackModal";
import Header from "./header/Header";
import AddTask from "./tasksLayout/addTask/AddTask";
import TaskList from "./tasksLayout/taskList/TaskList";
import styles from './Home.module.scss';

function Home() {
    const {
        mainModalContent,
        innerModalContent,
        feedbackModalContent,
        hideMainModal,
        hideInnerModal,
        hideFeedbackModal
    } = useModal();
    const [tasks, setTasks] = useState([]);
    const [fetchErr, setFetchErr] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hideFunc = feedbackModalContent ? hideFeedbackModal
            : innerModalContent ? hideInnerModal
                : hideMainModal

        const closeOnEsc = (e) => { if (e.key === 'Escape') hideFunc(); }
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    })

    const fetchTasks = async () => {
        try {
            const data = await callGetTasks();
            setFetchErr('');
            setTasks(data);
        } catch (err) {
            setTasks([]);
            setFetchErr(err.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className={styles.Home}>

            <>
                {
                    (mainModalContent || innerModalContent || feedbackModalContent) &&
                    <div
                        className={styles.overlay}
                        style={
                            feedbackModalContent ? { zIndex: '9250' }
                                : innerModalContent ? { zIndex: '9150' }
                                    : { zIndex: '9000' }
                        }
                        onClick={
                            feedbackModalContent ? hideFeedbackModal
                                : innerModalContent ? hideInnerModal
                                    : hideMainModal
                        }
                    ></div>
                }
                {mainModalContent && <MainModal>{mainModalContent}</MainModal>}
                {innerModalContent && <InnerModal>{innerModalContent}</InnerModal>}
                {feedbackModalContent && <FeedbackModal>{feedbackModalContent}</FeedbackModal>}
            </>

            <Header className={styles.Header} />

            <main className={styles.main}>
                <AddTask
                    className={styles.AddTask}
                    tasks={tasks}
                    fetchTasks={fetchTasks}
                />
                <TaskList
                    className={styles.TaskList}
                    tasks={tasks}
                    fetchErr={fetchErr}
                    isLoading={isLoading}
                    fetchTasks={fetchTasks}
                />
            </main>

        </div>
    );
}

export default Home;
