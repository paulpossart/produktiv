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

export { callCreateUser };