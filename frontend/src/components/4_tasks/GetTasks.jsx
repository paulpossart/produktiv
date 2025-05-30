import EditTasks from './EditTasks';
import PrioritiseTasks from './PrioritiseTasks';
import DeleteTasks from './DeleteTasks';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setModal } from '../6_utils/helpers/helperFunctions';
import { useModal } from '../../context/ModalContext';
import styles from './tasks.module.scss';
import expandIcon from '../../assets/expand.svg';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

function GetTasks({ fetchTasks, tasks }) {
    const [tasksOpen, setTasksOpen] = useState({});
    const { setModalContent } = useModal();

    useEffect(() => {
        fetchTasks();
    }, []);

    const openTasks = (taskId) => {
        setTasksOpen(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }))
    };

    const handleEdit = (taskId, fetchTasks, taskTitle, taskDescription) => {
        setModal({
            setModalContent: setModalContent,
            btn: false,
            content: <EditTasks
                taskId={taskId}
                fetchTasks={fetchTasks}
                originalTitle={taskTitle}
                originalDescription={taskDescription}
            />
        })
    }

    const handleDelete = (taskId, fetchTasks) => {
        setModal({
            setModalContent: setModalContent,
            btn: false,
            content: <DeleteTasks
                taskId={taskId}
                fetchTasks={fetchTasks}
            />
        })
    }

    return (
        <div className={styles.tasksDiv}>
            {tasks.length > 0 ? (
                <ul>
                    <AnimatePresence>
                        {

                            tasks.map((task, index) =>
                                <motion.li
                                    className={styles.li}
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}>

                                    <div className={styles.head}>
                                        <div className={styles.priority}>
                                            <PrioritiseTasks
                                                taskId={task.id}
                                                fetchTasks={fetchTasks}
                                                prevTask={tasks[index - 1] || null}
                                                prevPrevTask={tasks[index - 2] || null}
                                                nextTask={tasks[index + 1] || null}
                                                nextNextTask={tasks[index + 2] || null}

                                            />
                                        </div>
                                        <h3 className={styles.title}>{task.title}</h3>
                                        <div className={styles.expand}>
                                            <button className={styles.btn3} onClick={() => openTasks(task.id)}>
                                                <img className={tasksOpen[task.id] ? styles.expandUp : styles.expandDown} src={expandIcon} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`${styles.taskBody} ${tasksOpen[task.id] ? styles.tasksOpen : styles.tasksClosed}`}>
                                        <div className={styles.descBox}>
                                            <p>{task.description}</p>
                                        </div>
                                        <div className={styles.btnCont}>
                                            <button className={styles.btn2} onClick={() => handleEdit(
                                                task.id,
                                                fetchTasks,
                                                task.title,
                                                task.description
                                            )}>
                                                <img src={editIcon} />
                                            </button>
                                            <button className={styles.btn1} onClick={() => handleDelete(
                                                task.id, fetchTasks
                                            )}>
                                                <img src={deleteIcon} />
                                            </button>

                                        </div>
                                    </div>

                                </motion.li>
                            )
                        }
                    </AnimatePresence>
                </ul >
            ) : (
                <div className={styles.noTasks}>
                    <p>Please add a task</p>
                </div>
            )}
        </div>
    )
};

export default GetTasks;
