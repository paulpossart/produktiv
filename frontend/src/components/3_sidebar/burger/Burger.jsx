import styles from './burger.module.scss'

function Burger({ isOpen }) {
    return (
        <>
            <div className={styles.burgerBox}>

                <div className={
                    `${styles.line} ${isOpen ? styles.topCross : styles.topLine} `
                }></div>

                <div className={`${styles.line} ${isOpen ? styles.centerCross : styles.centerLine}`}></div>

                <div className={
                    `${styles.line} ${isOpen ? styles.bottomCross : styles.bottomLine}`
                }></div>

            </div>
        </>
    );

};

export default Burger;
