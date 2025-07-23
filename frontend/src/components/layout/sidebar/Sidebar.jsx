import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ModalContext';
import Account from '../account/Account';
import Burger from '../../utils/burger/Burger';
import ThemeBtn from '../../utils/themeBtn/ThemBtn';
import styles from './Sidebar.module.scss';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [signOutErr, setSignOutErr] = useState('');
    const { signOut } = useAuth();
    const { renderMainModal } = useModal();

    useEffect(() => {
        const closeOnEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); }
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    }, []);

    const logOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
        } catch (err) {
            setSignOutErr(err.message)
            setTimeout(() => setSignOutErr(''), 3000);
        }
    }

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
                        renderMainModal(<Account />);
                        setIsOpen(false)
                    }}
                    style={{ overflow: 'hidden' }}
                    className={styles.btn1}
                >
                    Account
                </button>

                <button 
                style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} className={styles.btn2} onClick={logOut}>Sign Out</button>

                {
                    signOutErr &&
                    <p role='alert' className={styles.inputErr}>
                        {signOutErr}
                    </p>
                }

            </nav>
        </aside>
    );
};

export default Sidebar;