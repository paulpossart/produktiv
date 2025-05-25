import { useEffect, useState } from 'react';
import styles from './tasks.module.scss';

import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';

function GetTasks({ fetchTasks, tasks }) {
    const [tasksOpen, setTasksOpen] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

    const openTasks = (taskId) => {
        setTasksOpen(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }))
    };

    return (
        <div className={styles.tasksDiv}>
            {tasks.length > 0 ? (
                <ul>
                    {
                        tasks.map((task, index) =>
                            <li className={styles.li} key={task.id}>

                                <div className={styles.head}>
                                    <div className={styles.priority}>
                                        <button></button>
                                        <button></button>
                                    </div>
                                    <h3 className={styles.title}>{task.title}</h3>
                                    <div className={styles.expand}>
                                        <button onClick={() => openTasks(task.id)}></button>
                                    </div>
                                </div>

                                <div className={`${styles.taskBody} ${tasksOpen[task.id] ? styles.tasksOpen : styles.tasksClosed}`}>
                                    <div className={styles.descBox}>
                                        <p>{task.description}</p>
                                    </div>
                                    <div className={styles.btnCont}>
                                        <button className={styles.btn2}><img src={editIcon} /></button>
                                        <button className={styles.btn1}><img src={deleteIcon} /></button>
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