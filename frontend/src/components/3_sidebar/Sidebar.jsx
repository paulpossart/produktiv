import Burger from '../6_utils/burger/Burger';
import ThemeBtn from '../6_utils/themeBtn/ThemBtn';
import SignOut from '../1_auth/SignOut';
import Account from '../5_users/Account';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { setModal } from '../6_utils/helpers/helperFunctions';
import { useModal } from '../../context/ModalContext';
import styles from './sidebar.module.scss';

function Sidebar({ className }) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { setModalContent } = useModal();

    const openAccount = () => {
        setModal({
            setModalContent: setModalContent,
            btn: false,
            content: <Account />
        })
    }

    return (
        <div className={`${className} ${styles.sidebarMain}`}>

            <div onClick={() => setIsOpen(false)} className={`${styles.overlay} ${isOpen ? styles.overlayOpen : styles.overlayClosed}`}></div>

            <div className={
                `${styles.burger} ${isOpen ? styles.openBurger : styles.closedBurger}`} onClick={() => setIsOpen(prev => !prev)}>
                <Burger isOpen={isOpen} />
            </div>

            <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>

                <br />

                <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    <ThemeBtn />
                </button>

                <button onClick={() => { setIsOpen(false); openAccount()}} className={styles.btn1} to='settings'>Account</button>

            <SignOut className={styles.btn2} />

        </div>
        </div >
    );
};

export default Sidebar;
