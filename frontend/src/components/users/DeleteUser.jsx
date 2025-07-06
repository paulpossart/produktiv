import { useModal } from "../../context/ModalContext";
import styles from './users.module.scss';

function DeleteUser() {
    return (
        <section aria-labelledby='delete-user'>
            <h2 id='delete-user'>Delete User</h2>
            <button>Delete</button>
            <button className={styles.btn1}>Cancel</button>
        </section>
    );
};

export default DeleteUser;