import { useNavigate } from 'react-router-dom';
import Modal from '../6_ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import styles from './account.module.scss';
import { callDeleteUser } from "../../apiCalls/usersCalls";

function DeleteUser() {
    const { setUser } = useAuth();
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const deleteUser = await callDeleteUser();

            if (deleteUser && deleteUser.success) {
                setModalContent(
                    <>
                        <p>{deleteUser.message}</p>
                        <button className={styles.btn1} onClick={() => {
                            setModalContent(null);
                            setUser(null);
                            navigate('/auth');
                        }}>
                            OK
                        </button>
                    </>
                )
            }
        } catch (err) {
            setModalContent(
                <>
                    <p>{err.message}</p>
                    <button
                        className={styles.btn1}
                        onClick={() => setModalContent(<DeleteUser />)}
                    >
                        OK
                    </button>
                </>
            )
        }
    }

    return (
        <Modal className={styles.deleteUser}>
            <p>Really delete?</p>
            <div className={styles.delBtns}>
                <button
                    type='button'
                    className={styles.btn2}
                    onClick={() => setModalContent(null)}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className={styles.btn1}
                    onClick={handleDelete}
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
};

export default DeleteUser;

