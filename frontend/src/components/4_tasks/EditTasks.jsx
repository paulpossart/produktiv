import { useState } from 'react';
import { callEditTasksById } from '../../apiCalls/tasksCalls';

import { useModal } from '../../context/ModalContext';
import { setModal } from '../6_utils/helperFunctions';

import styles from './tasks.module.scss';

function EditTasks({
    fetchTasks,
    taskId,
    originalTitle,
    originalDescription
}) {
    const [newTitle, setNewTitle] = useState(originalTitle);
    const [newDescription, setNewDescription] = useState(originalDescription);
    const { setModalContent } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) {
            setModal({
                setModalContent: setModalContent,
                message: 'title cannot be empty',
                content: () => setModal({
                    setModalContent: setModalContent,
                    btn: false,
                    message: <EditTasks
                        taskId={taskId}
                        fetchTasks={fetchTasks}
                        originalTitle={originalTitle}
                        originalDescription={originalDescription}
                    />
                })
            });
            return;
        }

        try {
            const data = await callEditTasksById(taskId, newTitle, newDescription);
            if (data?.success) {
                setModal({
                    setModalContent: setModalContent,
                    message: data.message
                });
            }
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                message: err.message
            });
        } finally {
            setNewTitle('');
            setNewDescription('');
            fetchTasks();
        }
    }

    return (
        <div className={styles.newTask}>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}

                />
                <div className={styles.taskBtns}>
                    <button className={styles.btn2} type='button' onClick={() => setModalContent(null)}>Cancel</button>
                    <button className={styles.btn1} type='submit'>Save</button>
                </div>

            </form>
        </div>
    );
};

export default EditTasks;