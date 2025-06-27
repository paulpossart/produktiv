import dukIcon from '../../../assets/duk-icon.svg';
import quack from '../../../assets/rubber-duk.mp3';
import styles from './Duk.module.scss';

function Duk({ errMsg }) {

    const handleClick = () => {
        const audio = new Audio(quack);
        audio.play();
    }

    return (
        <div className={
            `${styles.dukWrapper} 
             ${errMsg ? styles.dukOpen : styles.dukClosed}`
        }>
            <button
                onClick={handleClick}
                aria-label='Duck image, the site logo - click to hear it squeak!'
            >
                <img src={dukIcon} alt='' aria-hidden="true" />
            </button>
            <div className={styles.err}>
                {errMsg && <p role='alert'>{errMsg}</p>}
            </div>
        </div>
    );
};

export default Duk;
