import styles from './helper.module.scss';

const safeRegex = /^[^<>{};\\]*$/;
const bannedRegEx = '< > { } ; \\';

const changeInput = (e, setValue, setError, type) => {
    const value = e.target.value;
    setValue(value);

    if (value.length > 30) setError(`${type} should be between 1 - 30 characters`);
    else if (!safeRegex.test(value) && type === 'username') setError(`username cannot contain the following characters: ${bannedRegEx}`);
    else setError(null);
};

const validSubmmission = (username, password) => {
    if (!username.trim() || username.length > 30) {
        return {
            valid: false,
            message: 'username should be between 1 - 30 characters'
        };
    };

    if (!password || password.length < 6 || password.length > 30) {
        return {
            valid: false,
            message: 'password should be between 6 - 30 characters'
        };
    };

    if (!safeRegex.test(username)) {
        return {
            valid: false,
            message: `username cannot contain the following characters: ${bannedRegEx}`
        };
    }
    return { valid: true };
};

const setModal = ({
    setModalContent,
    message,
    content = null,
    btn = true,
    btnStyle = styles.btn1,
    divStyle = null
}) => {
    setModalContent(
        <div className={divStyle}>
            <div>{message}</div>
            <br />
            {btn && <button className={btnStyle} onClick={() => setModalContent(content)}>OK</button>}
        </div>
    )
};

/*const submit = (username, password, setContent) => {
    setContent(null);

    if (!username.trim() || username.length > 30) {
        setContent('username should be between 1 - 30 characters');
        return false;
    };

    if (!password || password.length < 6 || password.length > 30) {
        setContent('password should be between 6 - 30 characters');
        return false;
    };

    if (!safeRegex.test(username)) {
        setContent(
            `username cannot contain the following characters: ${bannedRegEx}`
        );
        return false;
    }
    return true;
};*/


export { changeInput, validSubmmission, setModal };
