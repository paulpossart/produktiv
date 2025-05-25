const callCreateTasks = async (title, description, prevId) => {
    const response = await fetch('/api/tasks', {
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
    const response = await fetch('api/tasks', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error('Unable to retrieve tasks');
    return data
}

export { callCreateTasks, callGetTasks };
