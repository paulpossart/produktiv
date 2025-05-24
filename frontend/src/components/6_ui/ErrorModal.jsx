import Modal from "./Modal";
import styles from './modal.module.scss';

function ErrorModal({ error, setError }) {
    return (
        <Modal>
            <p>{error}</p>
            <button className={styles.btn1} onClick={() => setError(null)}>OK</button>
        </Modal>
    );
};

export default ErrorModal;
