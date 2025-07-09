import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { useTasks } from '../../context/TasksContext';
import { callCreateTask } from '../../apiCalls/tasksCalls';
import styles from './tasks.module.scss';

function CreateTask({ prevTask = null }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { renderFeedbackModal, hideMainModal, setOnClose } = useModal();
    const { fetchTasks } = useTasks();
    const prevId = prevTask ? prevTask.id : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            renderFeedbackModal('Title cannot be empty');
            return;
        }

        try {
            const data = await callCreateTask(title, description, prevId);
            if (data?.success) {
                renderFeedbackModal(data.message);
                setOnClose(() => hideMainModal);
            }
        } catch (err) {
            renderFeedbackModal(err.message);
            
        } finally {
            setTitle('');
            setDescription('');
            fetchTasks();
        }

    };

    return (
        <form
            className={styles.CreateTask}
            aria-labelledby='create-task-title'
            onSubmit={handleSubmit}
        >
            <h2 id='create-task-title' className={styles.srOnly}>Create task</h2>

            <label htmlFor='title' className={styles.srOnly}>Title</label>
            <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='title'
            />

            <label htmlFor='description' className={styles.srOnly}>Description</label>
            <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='description'
            />

            <div className={styles.buttons}>
                <button className={styles.btn2} onClick={hideMainModal} type='button'>Cancel</button>
                <button className={styles.btn1} type='submit'>Add</button>
            </div>
        </form>
    );
};

export default CreateTask;