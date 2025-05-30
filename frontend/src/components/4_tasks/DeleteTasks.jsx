import { callDeleteTasksById } from '../../apiCalls/tasksCalls';
import { useModal } from '../../context/ModalContext';
import { setModal } from '../6_utils/helperFunctions';
import styles from './tasks.module.scss';

function DeleteTasks({ taskId, fetchTasks }) {
    const { setModalContent } = useModal();

    const handleDelete = async () => {
        try {
            const deleteTask = await callDeleteTasksById(taskId);

            if (deleteTask) {
                setModal({
                    setModalContent: setModalContent,
                    content: 'task deleted'
                })
            }
            
            fetchTasks();
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                content: err.message
            })
        }
    }

    return (
        <div className={styles.deleteTask}>
            <p>Really delete?</p>

            <div className={styles.delBtns}>
                <button
                    type='button'
                    className={styles.btn2}
                    onClick={() => setModalContent(null)}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className={styles.btn1}
                    onClick={handleDelete}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default DeleteTasks;