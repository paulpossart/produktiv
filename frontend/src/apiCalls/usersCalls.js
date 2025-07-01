const callCreateUser = async (newUsername, newPassword, retypedPassword) => {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            newUsername,
            newPassword,
            retypedPassword
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

const callGetUser = async () => {
    const response = await fetch('/api/users', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();

    if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message);
    }

    if (data?.userData) {
        return data;
    }

    return data.message;
}

export { callCreateUser, callGetUser };