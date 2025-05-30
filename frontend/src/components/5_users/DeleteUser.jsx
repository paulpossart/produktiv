import styles from './account.module.scss';

import Account from './Account';

import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import { callDeleteUser } from "../../apiCalls/usersCalls";
import { setModal, setUpdateMiniModal } from '../6_utils/helperFunctions';
import { useUserMsg } from '../../context/UserMsgContext';


function DeleteUser({ setMiniModal }) {
    const { setUser } = useAuth();
    const { setModalContent } = useModal();
    const navigate = useNavigate();
    const { setUserMsg } = useUserMsg();


    const handleDelete = async () => {
        try {
            const deleteUser = await callDeleteUser();

            if (deleteUser?.success) {

                setUserMsg(deleteUser.message)
                navigate('/new-credentials');
                setMiniModal(null)
                setModalContent(null)

            }
        } catch (err) {
            setUpdateMiniModal(setMiniModal, (
                <>
                    <p> {err.message}</p>
                    <button className={styles.btn1} onClick={() => setUpdateMiniModal(setMiniModal, <DeleteUser setMiniModal={setMiniModal} />)}>
                        OK
                    </button>
                </>
            ))
        }
    }

    return (

        <div className={styles.deleteUser}>
            <p>Really delete?</p>

            <div className={styles.delBtns}>
                <button
                    type='button'
                    className={styles.btn2}
                    onClick={() => setMiniModal(null)}
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

