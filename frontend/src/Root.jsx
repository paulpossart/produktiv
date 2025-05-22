import { Outlet } from 'react-router-dom';
import Header from './components/2_header/Header';
import styles from './root.module.scss';

function Root() {
    return (
        <div className={styles.root}>
            <Header className={styles.header} />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
