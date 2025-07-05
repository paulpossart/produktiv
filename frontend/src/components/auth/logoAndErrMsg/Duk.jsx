import styles from './Duk.module.scss';
import dukIcon from '../../../assets/duk-icon.svg';
import quack from '../../../assets/rubber-duk.mp3';

function Duk({ errMsg }) {

    // Duk img squeaks when clicked
    const handleClick = () => {
        const audio = new Audio(quack);
        audio.play();
    }

    return (
        //Duk img expands to include err message
        <div className={
            `${styles.dukWrapper} 
             ${errMsg ? styles.dukOpen : styles.dukClosed}`
        }>
            <button
                onClick={handleClick}
                aria-label='Duck image, the site logo - click to hear it squeak!'
            >
                <img src={dukIcon} alt='' />
            </button>
            <div className={styles.err}>
                {errMsg && <p role='alert'>{errMsg}</p>}
            </div>
        </div>
    );
};

export default Duk;
