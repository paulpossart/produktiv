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
        throw new Error(data.message);
    }

    if (data?.userData) {
        return data;
    }

    // additional return so that an error is not thrown if no 
    // auth tokens are present, meaning there is no user data to get
    return data.message;
}

const callUpdateUsername = async (newUsername, password) => {
    const response = await fetch('/api/users/update-username', {
        method: 'PATCH',
        body: JSON.stringify({
            newUsername,
            password
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

const callUpdatePassword = async (currentPassword, newPassword, confirmPassword) => {
    const response = await fetch('/api/users/update-password', {
        method: 'PATCH',
        body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export {
    callCreateUser,
    callGetUser,
    callUpdateUsername,
    callUpdatePassword
};