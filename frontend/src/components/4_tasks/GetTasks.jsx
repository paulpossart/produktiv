import { useEffect, useState } from 'react';
import EditTasks from './EditTasks';
import PrioritiseTasks from './PrioritiseTasks';
import DeleteTasks from './DeleteTasks';
import styles from './tasks.module.scss';

import expandIcon from '../../assets/expand.svg';


import editIcon from '../../assets/edit.svg';
import { setModal } from '../6_utils/helperFunctions';
import { useModal } from '../../context/ModalContext';

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
            message: <EditTasks
                taskId={taskId}
                fetchTasks={fetchTasks}
                originalTitle={taskTitle}
                originalDescription={taskDescription}
            />
        })
    }



    return (
        <div className={styles.tasksDiv}>
            {tasks.length > 0 ? (
                <ul>
                    {
                        tasks.map((task, index) =>
                            <li className={styles.li} key={task.id}>

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
                                        <DeleteTasks taskId={task.id} fetchTasks={fetchTasks} />
                                    </div>
                                </div>

                            </li>
                        )
                    }
                </ul >
            ) : (
                <p>Please add a task</p>
            )
            }
        </div>
    )
};

export default GetTasks;