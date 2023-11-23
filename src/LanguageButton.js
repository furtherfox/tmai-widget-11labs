// LanguageButton.js
import React from 'react';
import styles from './Widget.module.css';

const LanguageButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles['myWidget-languageButton']}>
      <img src="https://www.svgrepo.com/show/327318/language.svg" alt="Language" className={styles['myWidget-languageIcon']} />
    </button>
  );
};

export default LanguageButton;
