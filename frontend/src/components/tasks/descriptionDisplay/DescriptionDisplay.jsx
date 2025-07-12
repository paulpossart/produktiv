import { useState } from 'react';
import styles from './DescriptionDisplay.module.scss';

function DescriptionDisplay({ className, description, title }) {
    const [fullscreen, setFullscreen] = useState(false);

    const lines = description.split(/\n/);

    const editedDescription = lines.map((line, idx) => {
        const matchSubtitle = line.match(/^# (.*)/);
        if (matchSubtitle) {
            return (
                <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} key={idx}>
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

    return (
        <div
            className={
                `${className}
                 ${fullscreen ? styles.fullscreenDisplay : styles.Display}`
            }>
            <h2 style={{ display: 'none' }}>{title}</h2>
            <hr />
            <div style={{ textAlign: 'left' }}>{editedDescription}</div>
            <button onClick={() => setFullscreen(prev => !prev)}>Expand</button>
        </div>
    )
}

export default DescriptionDisplay;
