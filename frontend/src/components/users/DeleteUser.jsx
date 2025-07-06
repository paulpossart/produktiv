import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { callDeleteUser } from "../../apiCalls/usersCalls";
import styles from './users.module.scss';

function DeleteUser() {
    const { hideInnerModal,
        renderInnerModal,
        renderFeedbackModal,
        setOnAllClose,
        hideMainModal
    } = useModal();

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const deleteUser = async (e) => {
        const removeUser = () => {
            hideMainModal();
            setUser(null);
            navigate('/auth');
        }

        e.preventDefault();

        try {
            const data = await callDeleteUser();
            renderFeedbackModal(data?.message);
            setOnAllClose(() => removeUser)
        } catch (err) {
            renderFeedbackModal(err.message);
        }
    };

    const confirmDel = () => {
        renderInnerModal(
            <section aria-labelledby='confirm-delete' className={styles.DeleteUser}>
                <h2 id='confirm-delete' className={styles.srOnly}>Confirm User Deletion</h2>
                <p>Are you sure?</p>
                <button className={styles.delBtn} onClick={deleteUser}>Yes, delete</button>
                <button className={styles.btn2} onClick={hideInnerModal}>No, take me back</button>
            </section>
        );
    };

    return (
        <section aria-labelledby='delete-user' className={styles.DeleteUser}>
            <h2 id='delete-user'>Delete User</h2>
            <button className={styles.delBtn} onClick={confirmDel}>Delete</button>
            <button className={styles.btn2} onClick={hideInnerModal}>Cancel</button>
        </section>
    );
};

export default DeleteUser;