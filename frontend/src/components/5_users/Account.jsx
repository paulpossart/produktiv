import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import styles from './account.module.scss';
import { useModal } from '../../context/ModalContext';
import { setModal, setUpdateMiniModal } from '../6_utils/helperFunctions';
import homeIcon from '../../assets/home-btn.svg';


function Account() {
    const { user } = useAuth();
    const { setModalContent } = useModal();
    const [miniModal, setMiniModal] = useState(null);

    const username = user.username;
    const createdAt = new Date(user.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.account}>

            {miniModal && miniModal}

            <div className={styles.text}>
                <h2>{username}</h2>
                <p>produktiv since {createdAt}</p>
            </div>

            <div className={styles.btnContainer}>
                <button style={{ width: '90%', borderRadius: '12px' }} className={styles.btn2} onClick={() => setUpdateMiniModal(setMiniModal, <UpdateUser setMiniModal={setMiniModal} />)}>Change Username <br /> and Password</button>
                <button style={{ width: '90%', borderRadius: '12px' }} className={styles.btn2} onClick={() => setUpdateMiniModal(setMiniModal, <DeleteUser setMiniModal={setMiniModal} />)}>Delete User</button>
                <button className={`${styles.btn1} ${styles.homeBtn}`} onClick={() => setModalContent(null)}> <img src={homeIcon} /></button>
            </div>

        </div>
    );
};

export default Account;
