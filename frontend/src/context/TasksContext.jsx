import { createContext, useContext, useState, useEffect } from 'react';
import { callGetTasks } from '../apiCalls/tasksCalls';

const TasksContext = createContext();
const useTasks = () => useContext(TasksContext);

function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [fetchErr, setFetchErr] = useState('');

    const fetchTasks = async () => {
        try {
            const data = await callGetTasks();
            setFetchErr('');
            setTasks(data);
        } catch (err) {
            setTasks([]);
            setFetchErr(err.message)
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TasksContext.Provider value={{ fetchTasks, fetchErr, tasks }}>
            {children}
        </TasksContext.Provider>
    );
}

export { useTasks, TasksProvider };