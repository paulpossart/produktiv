import { useEffect } from 'react';
import styles from './tasks.module.scss';

function GetTasks({ fetchTasks, tasks }) {

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className={styles.tasksDiv}>
            {tasks.length > 0 ? (
                <ul>
                    {
                        tasks.map((task, index) =>
                            <li className={styles.li} key={task.id}>

                                <div className={styles.head}>
                                    <div className={styles.priority}>
                                        <button style={{ width: '10px', height: '10px', borderRadius: '50%' }}>x</button>
                                        <button style={{ width: '10px', height: '10px', borderRadius: '50%' }}>x</button>
                                    </div>

                                    <h3 className={styles.title}>{task.title}</h3>

                                    <div className={styles.expand}>
                                        <button style={{ width: '20px', height: '20px', borderRadius: '50%' }} >V</button>
                                    </div>
                                </div>

                                <div className={styles.taskBody}>
                                    <div className={styles.descBox}>
                                        <p className={styles.desc}>{task.description}</p>

                                    </div>

                                    <div className={styles.btnCont}>
                                        <button className={styles.btn2}>Edit</button>
                                        <button className={styles.btn1}>Delete</button>
                                    </div>
                                </div>

                            </li>
                        )
                    }
                </ul >
            ) : (
                <p>Please add a task!</p>
            )
            }

        </div>
    )
};

export default GetTasks;