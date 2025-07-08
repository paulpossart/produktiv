import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
    return (
        <section aria-labelledby='not-found-title' className={styles.NotFound}>
            <h1 id='not-found-title' className={styles.srOnly}>Page not found</h1>

            <div className={styles.userMsg}>
                <p>This page does not exist.</p>
                <p>Click OK to return.</p>
                <Link className={styles.btn1} to='/auth'>OK</Link>
            </div>

        </section>
    );
};

export default NotFound;