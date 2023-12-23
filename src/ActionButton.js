import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'; // Import faVolumeHigh
import styles from './Widget.module.css';

const ActionButton = ({ state, onClick }) => {
  return (
    <button onClick={onClick} className={styles['myWidget-actionButton']}>
      <FontAwesomeIcon icon={faVolumeHigh} className={styles['myWidget-icon']} /> 
      <span className={styles['myWidget-actionButtonText']}>
        {state === 'loading'
          ? <div className={styles['myWidget-spinner']}></div>
          : state === 'stop'
          ? 'Stop'
          : 'Tell me about it'}
      </span>
    </button>
  );
};


export default ActionButton;
