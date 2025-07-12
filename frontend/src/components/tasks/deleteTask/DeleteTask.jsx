import { useModal } from "../../../context/ModalContext";
import { callDeleteTaskById } from "../../../apiCalls/tasksCalls";
import styles from './DeleteTask.module.scss';

function DeleteTask({ taskId, fetchTasks }) {
    const {
        renderFeedbackModal,
        hideMainModal,
        setOnClose
    } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const data = await callDeleteTaskById(taskId);
            renderFeedbackModal(data?.message);
            setOnClose(() => hideMainModal);
            fetchTasks();
        } catch (err) {
            renderFeedbackModal(err.message);
        }
    }

    return (
        <section aria-labelledby='delete-task' className={styles.DeleteUser}>
            <h2 id='delete-task'>Delete Task?</h2>
            <button className={styles.btn1} onClick={handleClick}>Delete</button>
            <button className={styles.btn2} onClick={hideMainModal}>Cancel</button>
        </section>
    )
}

export default DeleteTask;