import duk from '../../assets/duk-yel.svg';
import styles from './header.module.scss';



function Header({className}) {
    return (
        <div className={`${className} ${styles.head}`}>
            <div className={styles.overlay}></div>
            <img className={styles.duk} src={duk} />
            <p className={styles.title}>pro&nbsp;·&nbsp;<span>duk</span>&nbsp;·&nbsp;tiv</p>
            <p className={styles.burger}>X</p>
        </div>
    );
};

export default Header;
