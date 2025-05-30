import { callPrioritiseTasksById } from '../../apiCalls/tasksCalls';
import { useModal } from '../../context/ModalContext';
import { setModal } from '../6_utils/helperFunctions';
import priorityUp from '../../assets/priority-up.svg';
import priorityDown from '../../assets/priority-down.svg';
import styles from './tasks.module.scss';

function PrioritiseTasks({ taskId, fetchTasks, prevTask, prevPrevTask, nextTask, nextNextTask }) {
    const { setModalContent } = useModal();

    const handlePriority = async (operator) => {
        const adjacent = operator === '+' ? prevTask : nextTask;
        if (!adjacent) return;

        const adjacentAdjacent = adjacent === prevTask ? prevPrevTask : nextNextTask;
        let adjacentAdjacentTaskId;
        if (adjacentAdjacent) adjacentAdjacentTaskId = adjacentAdjacent.id;
        else adjacentAdjacentTaskId = null;

        try {
            await callPrioritiseTasksById(taskId, operator, adjacent.id, adjacentAdjacentTaskId);
            fetchTasks();
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                content: err.message
            })
        }
    }

    return (
        <div className={styles.priority}>
            <button className={styles.btn3} onClick={() => handlePriority('+')}>
                <img className={styles.upBtn} src={priorityUp} />
            </button>
            <button className={styles.btn3} onClick={() => handlePriority('-')}>
                <img className={styles.downBtn} src={priorityUp} />
            </button>
        </div>
    );
};

export default PrioritiseTasks;
