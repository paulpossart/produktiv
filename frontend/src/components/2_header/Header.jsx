import styles from './header.module.scss';

import Sidebar from '../3_sidebar/Sidebar';

import Duk from '../6_utils/duk/Duk';
import dukStyles from '../6_utils/duk/duk.module.scss'

import { useTheme } from '../../context/ThemeContext';




function Header({ className }) {
    const { theme } = useTheme();

    return (
        <div className={`${className} ${styles.head}`}>
            <div className={`${styles.overlay} ${theme === 'dark' ? styles.darkOn : styles.darkOff}`}></div>
            <div className={`${styles.overlay} ${theme === 'light' ? styles.lightOn : styles.lightOff}`}></div>
            <Duk className={dukStyles.header} />
            <h1 className={styles.title}>pro&nbsp;·&nbsp;<span>duk</span>&nbsp;·&nbsp;tiv</h1>
            <Sidebar className={styles.sidebar} />
        </div>
    );
};

export default Header;
