import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import EditTask from './createAndEditTasks/EditTask';
import DeleteTask from './deleteTask/DeleteTask';
import PrioritiseTasks from './prioritiseTasks/PrioritiseTasks';
import DescriptionDisplay from './descriptionDisplay/DescriptionDisplay';
import styles from './tasks.module.scss';
import expandTaskIcon from '../../assets/expand.svg';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

function Tasks({ tasks, fetchTasks }) {
    const [openTasks, setOpenTasks] = useState({})
    const { renderMainModal } = useModal();

    const openTask = (taskId) => {
        setOpenTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    }

    const handleClickEdit = (taskId, originalTitle, originalDescription) => {
        renderMainModal(<EditTask
            taskId={taskId}
            originalTitle={originalTitle}
            originalDescription={originalDescription}
            fetchTasks={fetchTasks}
        />)
    }

    const handleClickDelete = (taskId) => {
        renderMainModal(<DeleteTask taskId={taskId} fetchTasks={fetchTasks} />)
    }

    return (
        <div className={styles.Tasks}>
            <ul>

                <AnimatePresence>
                    {
                        tasks.map((task, index) =>
                            <motion.li
                                key={task.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <article aria-labelledby={`task-title-${task.id}`}>

                                    <header className={styles.Header}>
                                        <div className={styles.priority}>
                                            <PrioritiseTasks
                                                taskId={task.id}
                                                prevTask={tasks[index - 1] || null}
                                                prevPrevTask={tasks[index - 2] || null}
                                                nextTask={tasks[index + 1] || null}
                                                nextNextTask={tasks[index + 2] || null}
                                                fetchTasks={fetchTasks}
                                            />
                                        </div>
                                        <h3 id={`task-title-${task.id}`} className={styles.title}>{task.title}</h3>
                                        <div className={styles.expand}>
                                            <button
                                                aria-label={openTasks[task.id] ? 'expand-task' : 'collapse-task'}
                                                className={styles.btn3}
                                                onClick={() => openTask(task.id)}>
                                                <img

                                                    className={
                                                        openTasks[task.id]
                                                            ? styles.expandUp
                                                            : styles.expandDown
                                                    }
                                                    src={expandTaskIcon}
                                                    alt='' />
                                            </button>
                                        </div>
                                    </header>

                                    <section aria-label='task-description-and-buttons' className={`${styles.Section} ${openTasks[task.id] ? styles.openSection : styles.closedSection}`}>
                                        <div className={styles.descBox}>
                                            <DescriptionDisplay
                                                description={task.description}
                                                title={task.title}
                                            />
                                        </div>

                                        <div className={styles.buttons}>
                                            <button
                                                aria-label={`edit-task-${task.id}`}
                                                className={styles.editBtn}
                                                onClick={() => handleClickEdit(task.id, task.title, task.description)}
                                            >
                                                <img src={editIcon} alt='' />
                                            </button>
                                            <button
                                                aria-label={`delete-task-${task.id}`}
                                                className={styles.delBtn}
                                                onClick={() => handleClickDelete(task.id)}
                                            >
                                                <img src={deleteIcon} alt='' />
                                            </button>
                                        </div>

                                    </section>

                                </article>
                            </motion.li>
                        )
                    }
                </AnimatePresence>
            </ul>
        </div>
    );
}

export default Tasks;