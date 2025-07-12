import { useState, useEffect } from 'react';
import { useModal } from '../../../context/ModalContext';
import { callCreateTask } from '../../../apiCalls/tasksCalls';
import styles from './CreateAndEditTasks.module.scss';

function CreateTask({tasks, fetchTasks}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleCharCount, setTitleCharCount] = useState(0);
    const [descCharCount, setDescCharCount] = useState(0);
    const [firstTask, setFirstTask] = useState(null);
    const { renderFeedbackModal, hideMainModal, setOnClose } = useModal();

    // get first task so that it's id & priority can be read, 
    // and the new task placed at a higher priority
    useEffect(() => {
        setFirstTask(tasks.length !== 0 ? tasks[0] : null)
    }, [tasks])

    useEffect(() => {
        setTitleCharCount(50 - title.length);
        setDescCharCount(500 - description.length)
    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            renderFeedbackModal('Title cannot be empty');
            return;
        }

        try {
            const data = await callCreateTask(title, description, firstTask?.id);
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
            <h2 id='create-task-title' className={styles.srOnly}>Create task form</h2>

            <label htmlFor='title' className={styles.srOnly}>Title</label>
            <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='title'
                maxLength='50'
                aria-describedby='title-count'
            />

            <p id='title-count' aria-live='polite' className={styles.charCount}>
                {title && (`${titleCharCount} ${titleCharCount === 1 ? 'character' : 'characters'} left`)}
            </p>

            <label htmlFor='description' className={styles.srOnly}>Description</label>
            <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='description'
                maxLength='500'
                aria-describedby='description-count'
            />

            <p id='description-count' aria-live='polite' className={styles.charCount}>
                {description && (`${descCharCount} ${descCharCount === 1 ? 'character' : 'characters'} left`)}
            </p>

            <div className={styles.buttons}>
                <button className={styles.btn2} onClick={hideMainModal} type='button'>Cancel</button>
                <button className={styles.btn1} type='submit'>Add</button>
            </div>
        </form>
    );
};

export default CreateTask;