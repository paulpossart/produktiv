const callSignIn = async (username, password) => {
    const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export { callSignIn };