import styles from './Modal.module.scss';

function MainModal({ children }) {
    return (
        <div className={styles.MainModal}>
            {children}
        </div>
    );
};

export default MainModal;

