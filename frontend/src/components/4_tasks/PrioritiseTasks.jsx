import { callPrioritiseTasksById } from '../../apiCalls/tasksCalls';
import { useModal } from '../../context/ModalContext';
import { setModal } from '../6_utils/helperFunctions';

function PrioritiseTasks({ taskId, fetchTasks, prevTask, nextTask }) {
    const { setModalContent } = useModal();

    const handlePriority = async (operator) => {
        const adj = operator === '+' ? prevTask : nextTask;
        if (!adj) return;

        try {
            await callPrioritiseTasksById(taskId, operator, adj.id);
            fetchTasks();
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                message: err.message
            })
        }
    }

    return (
        <>
            <button onClick={() => handlePriority('+')}></button>
            <button onClick={() => handlePriority('-')}></button>
        </>
    );
};

export default PrioritiseTasks;
