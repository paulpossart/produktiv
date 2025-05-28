import styles from './account.module.scss';

import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { callDeleteUser } from "../../apiCalls/usersCalls";
import { setModal } from '../6_utils/helperFunctions';

function DeleteUser() {
    const { setUser } = useAuth();
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const deleteUser = await callDeleteUser();

            if (deleteUser?.success) {
                setModal({
                    setModalContent: setModalContent,
                    btn: false,
                    message: (
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
                })
            }
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                message: (<p>{err.message}</p>),
            })
        }
    }

    return (

        <div className={styles.deleteUser}>
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
        </div>
    );
};

export default DeleteUser;

