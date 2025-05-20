const callSignIn = async (username, password) => {
    try {
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!response.ok) throw new Error('callSignIn error');

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

const callSignOut = async () => {
    try {
        const response = await fetch('/api/auth/sign-out', {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('callSignOut error');
    } catch (err) {
        console.log(err);
    }
};

export { callSignIn, callSignOut };
