import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { displayAccountModal } from '../modals/AccountModal';
import { useModal } from '../../../context/ModalContext';
import Burger from '../../utils/burger/Burger';
import ThemeBtn from '../../utils/themeBtn/ThemBtn';
import styles from './Sidebar.module.scss';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useAuth();
    const { setAccountModalContent } = useModal();

    useEffect(() => {
        const closeOnEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); }
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    }, []);

    return (
        <aside aria-labelledby='options-title' className={styles.Sidebar}>

            <div
                onClick={() => setIsOpen(false)}
                className={
                    `${styles.overlay} 
                       ${isOpen ? styles.overlayOpen : styles.overlayClosed}`}>
            </div>


            <h2 id='options-title' className={styles.srOnly}>Options Menu</h2>

            <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls='options-nav'
                onClick={() => setIsOpen(prev => !prev)}
                className={
                    `${styles.burger}
                     ${isOpen ? styles.openBurger : styles.closedBurger}`
                }
            >
                <Burger isOpen={isOpen} />
            </button>

            <nav id='options-nav' className={isOpen ? styles.navOpen : styles.navClosed}>

                <ThemeBtn />

                <button
                    onClick={() => {
                        displayAccountModal(setAccountModalContent);
                        setIsOpen(false)
                    }}
                    data-testid='account-btn'
                    style={{ overflow: 'hidden' }}
                    className={styles.btn1}
                >
                    Account
                </button>

                <button data-testid='sign-out-btn' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} className={styles.btn2} onClick={signOut}>Sign Out</button>

            </nav>
        </aside>
    );
};

export default Sidebar;