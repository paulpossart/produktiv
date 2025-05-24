import Sidebar from '../3_sidebar/Sidebar';
import duk from '../../assets/duk-yel.svg';
import styles from './header.module.scss';
import { useTheme } from '../../context/ThemeContext';
import Duk from '../6_ui/Duk';



function Header({ className }) {
    const { theme } = useTheme();

    return (
        <div className={`${className} ${styles.head}`}>
            <div className={`${styles.overlay} ${theme === 'dark' ? styles.darkOn : styles.darkOff}`}></div>
            <div className={`${styles.overlay} ${theme === 'light' ? styles.lightOn : styles.lightOff}`}></div>
            <Duk className={styles.duk} />
            { /*<img className={styles.duk} src={duk} /> */}
            <h1 className={styles.title}>pro&nbsp;·&nbsp;<span>duk</span>&nbsp;·&nbsp;tiv</h1>
            <Sidebar className={styles.sidebar} />
        </div>
    );
};

export default Header;
