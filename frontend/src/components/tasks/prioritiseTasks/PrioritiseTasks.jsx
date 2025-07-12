import { callPrioritiseTasksById } from "../../../apiCalls/tasksCalls";
import { useModal } from "../../../context/ModalContext";
import styles from './PrioritiseTasks.module.scss';
import priorityUpIcon from '../../../assets/arrow-up.svg'
import priorityDownIcon from '../../../assets/arrow-down.svg'

function PrioritiseTasks({
    taskId,
    prevTask,
    prevPrevTask,
    nextTask,
    nextNextTask,
    fetchTasks
}) {
    const { renderFeedbackModal } = useModal();

    const handleClick = async (operator) => {
        const adjacent = operator === '+' ? prevTask : nextTask;
        if (!adjacent) return;

        const adjacentAdjacent = adjacent === prevTask ? prevPrevTask : nextNextTask;
        const adjacentAdjacentTaskId = adjacentAdjacent?.id || null;

        try {
            await callPrioritiseTasksById(taskId, operator, adjacent.id, adjacentAdjacentTaskId)
          fetchTasks();
        } catch (err) {
            renderFeedbackModal(err.message);
        }
    }

    return (
        <div className={styles.PrioritiseTasks}>
            <button onClick={() => handleClick('+')} className={styles.btn3}>
                <img style={{bottom: '20%'}} src={priorityUpIcon} alt='' />
            </button>
            <button onClick={() => handleClick('-')} className={styles.btn3}>
                <img style={{top: '20%'}} src={priorityDownIcon} alt='' />
            </button>
        </div>
    )
}

export default PrioritiseTasks;