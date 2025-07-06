const changeInput = (e, setValue, setError, type) => {
    const safeRegex = /^[^<>{};\\]*$/;
    const bannedRegEx = '< > { } ; \\';

    const value = e.target.value;
    setValue(value);

    const capitaliseType = type.charAt(0).toUpperCase() + type.slice(1);

    if (value.length > 30) setError(`${capitaliseType} maximum 30 characters`);
    else if (value.length < 6 && type === 'password') setError('Password minimum 6 characters')
    else if (!safeRegex.test(value) && type === 'username') setError(`Username cannot contain the following characters: ${bannedRegEx}`);
    else setError(null);
};

const isValidSubmission = (input, type) => {
    const safeRegex = /^[^<>{};\\]*$/;

    if (input.length > 30) return false;

    if (
        type === 'username' &&
        (!input.trim() || !safeRegex.test(input))
    ) return false;

    if (type === 'password' && (!input || input.length < 6)) return false;

    return true;
}

export { changeInput, isValidSubmission };