import { useTheme } from '../../../context/ThemeContext';
import Sidebar from '../sidebar/Sidebar';
import styles from './Header.module.scss';
import dukIcon from '../../../assets/duk-icon.svg';
import quack from '../../../assets/rubber-duk.mp3';

function Header({ className }) {
    const { theme } = useTheme();

    const handleClick = () => {
        const audio = new Audio(quack);
        audio.play();
    }

    return (
        <header id='header' aria-labelledby='site-title' className={`${className} ${styles.header}`} >

            <div className={`${styles.overlay} ${theme === 'dark' ? styles.darkOn : styles.darkOff}`}></div>
            <div className={`${styles.overlay} ${theme === 'light' ? styles.lightOn : styles.lightOff}`}></div>

            <div className={styles.logo}>
                <button
                    className={styles.duk}
                    aria-label='Duck image, the site logo - click to hear it squeak!'
                    onClick={handleClick}
                >
                    <img src={dukIcon} alt='' />
                </button>
            </div>

            <div className={styles.title}>
                <h1 id='site-title' aria-label='produktiv'>pro&nbsp;·&nbsp;<span>duk</span>&nbsp;·&nbsp;tiv</h1>
            </div>

            <div className={styles.sidebar} aria-label='options menu'>
                <Sidebar />
            </div>

        </header >
    );
};

export default Header;