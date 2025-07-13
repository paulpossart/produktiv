import { useTheme } from '../../../context/ThemeContext';
import { useModal } from '../../../context/ModalContext';
import styles from './DescriptionDisplay.module.scss';
import expandIconWht from '../../../assets/expand-screen-white.svg';
import expandIconBlk from '../../../assets/expand-screen-black.svg';
import collapseIconWht from '../../../assets/collapse-screen-white.svg';
import collapseIconBlk from '../../../assets/collapse-screen-black.svg';

function DescriptionDisplay({ description, title }) {
    const { theme } = useTheme();
    const { renderMainModal, hideMainModal } = useModal();

    const lines = description.split(/\n/);

    const editedDescription = lines.map((line, idx) => {
        const matchSubtitle = line.match(/^# (.*)/);
        if (matchSubtitle) {
            return (
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', textDecoration: 'underline' }} key={idx}>
                    {matchSubtitle[1]}
                </h3>
            );
        }

        const matchList = line.match(/^(\d+\.|-) (.*)/);
        if (matchList) {
            return (
                <p style={{ paddingLeft: '20px' }} key={idx}>
                    {matchList[1]}  {matchList[2]}
                </p>
            );
        }

        if (!line.trim()) {
            return <br key={idx} />;
        }

        return <p key={idx}>{line}</p>;
    });

    const handleClick = (e) => {
        e.preventDefault();
        renderMainModal(
            <div className={styles.modalDisplay}>
                <div className={styles.desc}>
                    <h2>{title}</h2>
                    <div>{editedDescription}</div>
                </div>

                <div>
                    <button
                        className={styles.btn1}
                        onClick={hideMainModal}>
                        Close
                    </button>
                </div>
            </div>
        )

    }

    return (
        <div className={styles.Display}>
            <button
                className={theme === 'light' ? styles.ltBtn : styles.dkBtn}
                onClick={handleClick}>
                <img
                    src={
                        theme === 'light'
                            ? expandIconBlk
                            : expandIconWht
                    }
                    alt='' />
            </button>
            <div>{editedDescription}</div>

        </div>
    )
}

export default DescriptionDisplay;
