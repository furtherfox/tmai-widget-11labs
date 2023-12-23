import React from 'react';
import styles from './Widget.module.css';

// Use React.forwardRef to pass the ref to the select element
const LanguageSelector = React.forwardRef(({ language, setLanguage, isVisible }, ref) => (
  <select
    ref={ref} // Attach the ref to the select element
    className={`${styles['myWidget-language-selector']} ${isVisible ? styles.visible : ''}`}
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="English">English</option>
    <option value="Spanish">Spanish</option>
    <option value="French">French</option>
    <option value="German">German</option>
    <option value="Polish">Polish</option>
    <option value="Italian">Italian</option>
    <option value="Portuguese">Portuguese</option>
    <option value="Hindi">Hindi</option>
    <option value="Arabic">Arabic</option>
  </select>
));

export default LanguageSelector;

