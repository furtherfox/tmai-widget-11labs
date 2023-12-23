import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'; // Import faVolumeHigh
import styles from './Widget.module.css';

// Use <FontAwesomeIcon icon={faVolumeHigh} /> instead of <FontAwesomeIcon icon={faHeadphones} />
const ActionButton = ({ state, onClick, playText, stopText }) => {
  let displayText;
  if (state === 'loading') {
    // Replace this with a spinner or any loading indicator
    displayText = <div className={styles['myWidget-spinner']}></div>;
  } else {
    displayText = state === 'stop' ? stopText : playText;
  }

  return (
    <button onClick={onClick} className={styles['myWidget-actionButton']}>
      <FontAwesomeIcon icon={faVolumeHigh} className={styles['myWidget-icon']} /> {/* Updated icon */}
      <span className={styles['myWidget-actionButtonText']}>
        {displayText}
      </span>
    </button>
  );
};

export default ActionButton;
