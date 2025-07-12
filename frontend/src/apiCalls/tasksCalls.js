const callCreateTask = async (title, description, firstTaskId) => {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            firstTaskId
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

const callGetTasks = async () => {
    const response = await fetch('/api/tasks', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error('Unable to retrieve tasks');
    return data;
}

const callEditTaskById = async (taskId, newTitle, newDescription) => {
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
}

const callPrioritiseTasksById = async (taskId, operator,
    adjacentTaskId, adjacentAdjacentTaskId) => {
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

    if (!response.ok) throw new Error('Unable to update task priority, please try again later')
    return;
}

const callDeleteTaskById = async (taskId) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) throw new Error('Unable to delete task, please try again later');
    const data = await response.json();
    return data;
}

export {
    callCreateTask,
    callGetTasks,
    callEditTaskById,
    callPrioritiseTasksById,
    callDeleteTaskById
}