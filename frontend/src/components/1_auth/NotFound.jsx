import { Link } from 'react-router-dom';
import styles from './auth.module.scss';

function NotFound() {
    return (
        <div className={styles.backgroundImg}>
            <div className={styles.notFound}>
                <p>You appear to be lost.</p>
                <p>Click here to return</p>
                <Link className={styles.btn1} to='/auth'>OK</Link>
            </div>
        </div>
    );
};

export default NotFound;
