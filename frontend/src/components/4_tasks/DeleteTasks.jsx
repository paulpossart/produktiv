import { callDeleteTasksById } from '../../apiCalls/tasksCalls';
import { useModal } from '../../context/ModalContext';
import { setModal } from '../6_utils/helperFunctions';
import styles from './tasks.module.scss';
import deleteIcon from '../../assets/delete.svg';

function DeleteTasks({ taskId, fetchTasks }) {
    const { setModalContent } = useModal();

    const handleDelete = async () => {
        try {
            await callDeleteTasksById(taskId);
            fetchTasks();
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                message: err.message
            })
        }
    }

    return (
        <button className={styles.btn1} onClick={handleDelete}>
            <img src={deleteIcon} />
        </button>
    );
};

export default DeleteTasks;