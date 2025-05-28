const backendUrl = import.meta.env.VITE_BACKEND_URL;

const callCreateUser = async (newUsername, newPassword) => {

    const response = await fetch(`${backendUrl}/api/users`, {
        method: 'POST',
        body: JSON.stringify({
            newUsername,
            newPassword
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callGetUser = async () => {
    console.log(backendUrl)
    const response = await fetch(`${backendUrl}/api/users`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
        return null
    };

    if (data.userData) {
        return data;
    }

    return null;
}

const callUpdateUser = async (updatedUsername, updatedPassword) => {
    const response = await fetch(`${backendUrl}/api/users`, {
        method: 'PUT',
        body: JSON.stringify({
            updatedUsername,
            updatedPassword
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callDeleteUser = async () => {
    const response = await fetch(`${backendUrl}/api/users`, {
        method: 'DELETE',
        credentials: 'include'
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error('Unable to delete user');
    return data;
}

export { callCreateUser, callGetUser, callUpdateUser, callDeleteUser };
