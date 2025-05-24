import { useState } from 'react';
import { callCreateTasks } from '../../apiCalls/tasksCalls';
import Modal from '../6_ui/Modal';
import { useModal } from '../../context/ModalContext';
import styles from './tasks.module.scss';

function CreateTasks({fetchTasks, prevTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { setModalContent } = useModal();

    const prevId = prevTask ? prevTask.id : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setModalContent(
                <>
                    <p>Title cannot be empty</p>
                    <button
                        className={styles.btn1}
                        onClick={() => setModalContent(<CreateTask />)}
                    >
                        OK
                    </button>
                </>
            );

            return;
        }

        try {
            const data = await callCreateTasks(title, description, prevId);
            if (data && data.success) {
                setModalContent(
                    <>
                        <p>{data.message}</p>
                        <button
                           className={styles.btn1}
                            onClick={() => setModalContent(null)}
                        >
                            OK
                        </button>
                    </>
                );
            } else {
                setModalContent(
                    <>
                        <p>an error occured</p>
                        <button
                           className={styles.btn1}
                            onClick={() => setModalContent(null)}
                        >
                            OK
                        </button>
                    </>
                );
            }

        } catch (err) {
            setModalContent(err.message)
        } finally {
            setTitle('');
            setDescription('');
            fetchTasks();
        }
    };

    return (
        <Modal className={styles.newTask}>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='title'
                />
                <textarea
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='description'
                />
                <div className={styles.taskBtns}>
                    <button className={styles.btn2} type='button' onClick={()=>setModalContent(null)}>Cancel</button>
                    <button className={styles.btn1} type='submit'>Add</button>
                </div>

            </form>
        </Modal>
    );
};

export default CreateTasks;
