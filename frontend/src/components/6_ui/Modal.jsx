import styles from './modal.module.scss';

function Modal({ children, className }) {
    if (!children) return null;

    return (
        <>
            <div className={styles.modalOverlay}></div>
            <div className={`${styles.modal} ${className}`}>
                {children}
            </div>
        </>
    )
}

export default Modal;
