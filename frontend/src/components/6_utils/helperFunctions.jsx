import styles from './helper.module.scss';

const safeRegex = /^[^<>{};\\]*$/;
const bannedRegEx = '< > { } ; \\';

const changeInput = (e, setValue, setError, type) => {
    const value = e.target.value;
    setValue(value);

    if (value.length > 30) setError(`${type} maximum 30 characters`);
    else if (value.length < 6 && type === 'password') setError('password minimum 6 characters')
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
    content,
    btn = true,
    clickTo = null,
    btnStyle = styles.btn1,
    divStyle = styles.modal
}) => {
    setModalContent(
        <div className={divStyle}>
            <div>{content}</div>
            {btn && <button className={btnStyle} onClick={() => setModalContent(clickTo)}>OK</button>}
        </div>
    )
};


const setUpdateMiniModal = (setter, content) => {
    setter(
        <>
            <div onClick={() => setter(null)} className={styles.modalOverlay}></div>
            <div className={styles.modal}>{content}</div>
        </>
    )
}

export { changeInput, validSubmmission, setModal, setUpdateMiniModal };
