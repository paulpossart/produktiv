//const backendUrl = import.meta.env.VITE_BACKEND_URL;

const callCreateTasks = async (title, description, prevId) => {
    const response = await fetch(`/api/tasks`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            prevId
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callGetTasks = async () => {
    const response = await fetch(`/api/tasks`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error('Unable to retrieve tasks');
    return data
}

const callEditTasksById = async (taskId, newTitle, newDescription) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({
            newTitle,
            newDescription
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callPrioritiseTasksById = async (taskId, operator, adjacentTaskId, adjacentAdjacentTaskId) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            operator,
            adjacentTaskId,
            adjacentAdjacentTaskId
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) throw new Error('unable to update task priority')
    return;
};

const callDeleteTasksById = async (taskId) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) throw new Error('unable to delete task');
    return true;
};

export {
    callCreateTasks,
    callGetTasks,
    callEditTasksById,
    callPrioritiseTasksById,
    callDeleteTasksById
};
