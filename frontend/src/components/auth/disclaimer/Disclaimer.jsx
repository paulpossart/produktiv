import styles from './Disclaimer.module.scss';

function Disclaimer({ onClick }) {
    return (
        <>
            <div className={styles.DisclaimerOverlay}></div>
            <aside aria-label='disclaimer' className={styles.Disclaimer}>
                <p>This app is for users aged <span>13 and over</span>.</p>
                <p>Choose a <span>username</span> that doesn't include any <span>personal info</span>.</p>
                <p>Usernames are stored <span>privately</span> and <span>only</span> used for the app.</p>
                <p>You can <span>delete your account</span> at any time in the settings.</p>

                <button
                    onClick={onClick}
                    className={styles.DisclaimerBtn}
                    aria-label="acknowledge disclaimer"
                    autoFocus
                >
                    OK
                </button>
            </aside>

        </>
    );
};

export default Disclaimer;
