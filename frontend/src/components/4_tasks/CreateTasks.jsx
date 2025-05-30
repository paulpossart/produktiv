import { useState } from 'react';
import { callCreateTasks } from '../../apiCalls/tasksCalls';
import Modal from '../6_utils/modal/Modal';
import { setModal } from '../6_utils/helperFunctions';
import { useModal } from '../../context/ModalContext';
import styles from './tasks.module.scss';

function CreateTasks({ fetchTasks, prevTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { setModalContent } = useModal();

    const prevId = prevTask ? prevTask.id : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setModal({
                setModalContent: setModalContent,
                content: 'title cannot be empty',
                clickTo: () => setModal({
                    setModalContent: setModalContent,
                    btn: false,
                    content: <CreateTasks
                        fetchTasks={fetchTasks}
                        prevTask={prevTask} />
                })
            });
            return;
        }

        try {
            const data = await callCreateTasks(title, description, prevId);
            if (data?.success) {
                setModal({
                    setModalContent: setModalContent,
                    content: data.message
                });
            }
        } catch (err) {
            setModal({
                setModalContent: setModalContent,
                content: err.message
            });
        } finally {
            setTitle('');
            setDescription('');
            fetchTasks();
        }
    };

    return (
        <div className={styles.newTask}>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='title'
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='description'
                />
                <div className={styles.taskBtns}>
                    <button className={styles.btn2} type='button' onClick={() => setModalContent(null)}>Cancel</button>
                    <button className={styles.btn1} type='submit'>Add</button>
                </div>

            </form>
        </div>
    );
};

export default CreateTasks;
