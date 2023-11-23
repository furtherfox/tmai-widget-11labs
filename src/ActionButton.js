import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import styles from './Widget.module.css';

const ActionButton = ({ state, onClick }) => {
  return (
    <button onClick={onClick} className={styles['myWidget-actionButton']}>
      <FontAwesomeIcon icon={faHeadphones} className={styles['myWidget-icon']} />
      <span className={styles['myWidget-actionButtonText']}>
        {state === 'loading' ? 'Loading...' : state === 'stop' ? 'Stop' : 'Tell me about it'}
      </span>
    </button>
  );
};

export default ActionButton;
