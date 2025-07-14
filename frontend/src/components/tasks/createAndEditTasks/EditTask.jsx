import { useState, useEffect } from 'react';
import { useModal } from '../../../context/ModalContext';
import { callEditTaskById } from '../../../apiCalls/tasksCalls';
import FormattingInfo from './FormattingInfo';
import styles from './CreateAndEditTasks.module.scss';

function EditTask({ taskId, originalTitle, originalDescription, fetchTasks }) {
    const [newTitle, setNewTitle] = useState(originalTitle);
    const [newDescription, setNewDescription] = useState(originalDescription);
    const [titleCharCount, setTitleCharCount] = useState(0);
    const [descCharCount, setDescCharCount] = useState(0);
    const { renderFeedbackModal, hideMainModal, setOnClose } = useModal();

    useEffect(() => {
        setTitleCharCount(50 - newTitle.length);
        setDescCharCount(500 - newDescription.length)
    }, [newTitle, newDescription])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newTitle.trim()) {
            renderFeedbackModal('Title cannot be empty');
            return;
        }

        try {
            const data = await callEditTaskById(taskId, newTitle, newDescription);
            if (data?.success) {
                renderFeedbackModal(data.message);
                setOnClose(() => hideMainModal);
            }
        } catch (err) {
            renderFeedbackModal(err.message);
        } finally {
            setNewTitle('');
            setNewDescription('');
            fetchTasks();
        }
    }

    return (
        <form
            className={styles.EditTask}
            aria-labelledby='edit-task-title'
            onSubmit={handleSubmit}
        >

            <h2 id='edit-task-form' className={styles.srOnly}>Edit task form</h2>

            <label htmlFor='new-title' className={styles.srOnly}>New title</label>
            <input
                id='new-title'
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength='50'
                aria-describedby='new-title-count'
            />

            <p id='new-title-count' aria-live='polite' className={styles.charCount}>
                {newTitle && (`${titleCharCount} ${titleCharCount === 1 ? 'character' : 'characters'} left`)}
            </p>

            <label htmlFor='new-description' className={styles.srOnly}>New description</label>
            <textarea
                id='new-description'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                maxLength='500'
                aria-describedby='new-description-count'
            />

            <p id='new-description-count' aria-live='polite' className={styles.charCount}>
                {newDescription && (`${descCharCount} ${descCharCount === 1 ? 'character' : 'characters'} left`)}
            </p>

            <div className={styles.buttons}>

                <FormattingInfo />

                <div>
                    <button className={styles.btn2} onClick={hideMainModal} type='button'>Cancel</button>
                    <button className={styles.btn1} type='submit'>Add</button>
                </div>
            </div>

        </form>
    )
}

export default EditTask;