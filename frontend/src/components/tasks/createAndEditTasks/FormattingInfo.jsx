import { useModal } from '../../../context/ModalContext';
import styles from './CreateAndEditTasks.module.scss';
import infoIcon from '../../../assets/info-black.svg';

function FormattingInfo() {
    const { renderInnerModal, hideInnerModal } = useModal();

    const handleClick = () => {
        renderInnerModal(
            <section aria-labelledby='formatting-guide-title' className={styles.FormattingInfo}>
                <div className={styles.formatGuide}>
                    <h3 id='formatting-guide-title'>Formatting Guide</h3>

                    <h4>Subtitle</h4>
                    <p>To create a subtitle, start a new line with a
                        hashtag and a space, followed by the subtitle text:
                        <span># Text</span>

                        <span>renders: <span style={{ display: 'inline' }} className={styles.subtitle}>Text</span></span>
                    </p>

                    <br />

                    <h4>Lists</h4>
                    <p>Lists will be left-indented. To make a list,
                        start a new line with:
                        <span style={{ paddingLeft: '20px' }}>- Ordered List: a number, a full-stop, and a space, followed by text</span>
                        <span style={{ paddingLeft: '20px' }}>- Unordered List: a hyphen and a space, followed by text</span>
                    </p>

                    <br />

                    <div className={styles.listDisplay}>
                        <div>
                            <div><span>1. an</span>
                                <span>2. ordered</span>
                                <span>3. list</span>
                            </div>
                        </div>

                        <div>
                            <span>- an</span>
                            <span>- unordered</span>
                            <span>- list</span>
                        </div>
                    </div>


                    <br />

                    <h4>Line Break</h4>
                    <p>Press Enter twice to insert a line break</p>
                </div >

                <div className={styles.buttons}>

                    <button
                        className={styles.btn1}
                        onClick={hideInnerModal}
                    >
                        OK
                    </button>

                </div>
            </section >
        )
    };

    return (
        <button
            onClick={handleClick}
            type='button'
            className={styles.infoBtn}
            aria-label='formatting-info'>
            <img src={infoIcon} alt='' />
        </button>
    )
}

export default FormattingInfo;