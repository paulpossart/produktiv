import { useAuth } from "../../../context/AuthContext";
import { useModal } from "../../../context/ModalContext";
import styles from './Account.module.scss';
import homeIcon from '../../../assets/home-btn.svg';

function Account() {
    const { user } = useAuth();
    const { hideMainModal } = useModal();

    const username = user.username;

    let day = new Date(user.created_at).toLocaleString('en-GB', {
        day: 'numeric'
    });

    if (
        day.endsWith('11') ||
        day.endsWith('12') ||
        day.endsWith('13')
    ) {
        day += 'th ';
    }
    else if (day.endsWith('1')) day += 'st ';
    else if (day.endsWith('2')) day += 'nd ';
    else if (day.endsWith('3')) day += 'rd ';
    else day += 'th ';

    const monthAndYear = new Date(user.created_at).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
    });

    const createdAt = day + monthAndYear

    return (
        <section aria-labelledby='account-title' className={styles.Account}>

            {/* inputModal && inputModal */}

            <header>
                <h2 id='account-title' className={styles.srOnly}>Account Page</h2>
                <h3>{username}</h3>
                <h4>produktiv since {createdAt}</h4>
            </header>

            <nav>
                <button style={{ borderRadius: '12px' }} className={styles.btn2}>change username</button>
                <button style={{ borderRadius: '12px' }} className={styles.btn2}>change password</button>
                <button style={{ borderRadius: '12px' }} className={styles.btn2}>delete user</button>
                <button aria-label='home-button' className={styles.homeBtn} onClick={hideMainModal}>
                    <img src={homeIcon} alt='' />
                </button>
            </nav>

        </section>
    );

};

export default Account;