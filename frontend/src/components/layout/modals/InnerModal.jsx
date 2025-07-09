import styles from './Modal.module.scss';

function InnerModal({ children }) {
    return (
        <div className={styles.InnerModal}>
            {children}
        </div>
    );
};

export default InnerModal;