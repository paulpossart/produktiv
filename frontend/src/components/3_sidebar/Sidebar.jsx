import { useState } from 'react';
import { Link } from 'react-router-dom';
import Burger from './Burger';
import SignOut from '../1_auth/SignOut';
import ThemeBtn from './ThemBtn';
import { useTheme } from '../../context/ThemeContext';
import styles from './sidebar.module.scss';


function Sidebar({ className }) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <div className={`${className} ${styles.sidebarMain}`}>

            <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : styles.overlayClosed}`}></div>

            <div className={
                `${styles.burger} ${isOpen ? styles.openBurger : styles.closedBurger}`} onClick={() => setIsOpen(prev => !prev)}>
                <Burger isOpen={isOpen} />
            </div>

            <div className={`${styles.sidebar} ${isOpen
                ? styles.sidebarOpen : styles.sidebarClosed}`}>
                
                <br />

                <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    <ThemeBtn />
                </div>

                <Link onClick={() => setIsOpen(false)} className={styles.btn1} to='settings'>Account</Link>

                <SignOut className={styles.btn2} />

            </div>
        </div >
    );
};

export default Sidebar;
